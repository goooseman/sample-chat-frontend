export interface GMachine<T extends string[], E extends string[]> {
  value: T[number];
  transition: (currentState: T[number], event: E[number]) => T[number];
}

export type MachineOptions<T extends string[], E extends string[]> = {
  [stateName in T[number]]: {
    actions?: {
      onEnter?: () => void;
      onExit?: () => void;
    };
    transitions: {
      [eventName in E[number]]: {
        target: T[number];
        action?: () => void;
      };
    };
  };
} & {
  initialState: T[number];
};

export const createMachine = <T extends string[], E extends string[]>(
  definition: MachineOptions<T, E>
): GMachine<T, E> => {
  const machine = {
    value: definition.initialState,
    transition: (currentState: T[number], event: E[number]) => {
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
