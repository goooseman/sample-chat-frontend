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
      onEnter?: (event: Ev) => void;
      onExit?: (event: Ev) => void;
    };
    transitions: Partial<
      {
        [eventName in E]: {
          target: T;
          action?: (event: Ev) => void;
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
      destTransition.action?.(event);
      currStateDefinition.actions?.onExit?.(event);
      definition[destState].actions?.onEnter?.(event);
      return machine.value;
    },
  };
  return machine;
};
