export interface EmptyEvent<E> {
  type: E;
  payload?: unknown;
}

export interface GMachine<
  T extends string,
  E extends string,
  Ev extends EmptyEvent<E>
> {
  value: T;
  transition: (currentState: T, event: Ev) => T;
}

export type MachineOptions<
  T extends string,
  E extends string,
  Ev extends EmptyEvent<E>
> = {
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

export const createMachine = <
  T extends string,
  E extends string,
  Ev extends EmptyEvent<E>
>(
  definition: MachineOptions<T, E, Ev>
): GMachine<T, E, Ev> => {
  const machine = {
    value: definition.initialState,
    transition: (currentState: T, event: Ev) => {
      const currStateDefinition = definition[currentState];
      const destTransition = currStateDefinition.transitions[event.type];
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
