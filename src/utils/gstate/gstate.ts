export interface GMachine<T extends string, E extends string> {
  value: T;
  transition: (currentState: T, event: E) => T;
}

export type MachineOptions<T extends string, E extends string> = {
  [stateName in T]: {
    actions?: {
      onEnter?: () => void;
      onExit?: () => void;
    };
    transitions: Partial<
      {
        [eventName in E]: {
          target: T;
          action?: () => void;
        };
      }
    >;
  };
} & {
  initialState: T;
};

export const createMachine = <T extends string, E extends string>(
  definition: MachineOptions<T, E>
): GMachine<T, E> => {
  const machine = {
    value: definition.initialState,
    transition: (currentState: T, event: E) => {
      const currStateDefinition = definition[currentState];
      const destTransition = currStateDefinition.transitions[event];
      if (!destTransition) {
        return machine.value;
      }
      const destState = destTransition.target;
      machine.value = destState;
      destTransition.action?.();
      currStateDefinition.actions?.onExit?.();
      definition[destState].actions?.onEnter?.();
      return machine.value;
    },
  };
  return machine;
};
