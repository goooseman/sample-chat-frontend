import { createMachine, GMachine } from "./gstate";

type MachineStates = "off" | "on";
type MachineEvents = "switch";

let machine: GMachine<MachineStates, MachineEvents>;

let transitionActionSpy: jest.Mock;
let onEnterSpy: jest.Mock;
let onExitSpy: jest.Mock;

beforeEach(() => {
  transitionActionSpy = jest.fn();
  onEnterSpy = jest.fn();
  onExitSpy = jest.fn();
  machine = createMachine<MachineStates, MachineEvents>({
    off: {
      transitions: {
        switch: {
          target: "on",
          action: transitionActionSpy,
        },
      },
      actions: {
        onEnter: onEnterSpy,
        onExit: onExitSpy,
      },
    },
    on: {
      transitions: {
        switch: {
          target: "off",
          action: transitionActionSpy,
        },
      },
      actions: {
        onEnter: onEnterSpy,
        onExit: onExitSpy,
      },
    },
    initialState: "off",
  });
});

it("should use initialState as default value", () => {
  expect(machine.value).toBe("off");
});

it("should contain transiton function which returns value", () => {
  expect(machine.transition("off", "switch")).toBe("on");
});

it("should switch the state", () => {
  let state = machine.value;
  state = machine.transition(state, "switch");
  expect(state).toBe("on");
  state = machine.transition(state, "switch");
  expect(state).toBe("off");
});

it("should fire action", () => {
  let state = machine.value;
  state = machine.transition(state, "switch");
  expect(transitionActionSpy).toBeCalledTimes(1);
  machine.transition(state, "switch");
  expect(transitionActionSpy).toBeCalledTimes(2);
});

it("should fire onEnter", () => {
  let state = machine.value;
  state = machine.transition(state, "switch");
  expect(onEnterSpy).toBeCalledTimes(1);
  machine.transition(state, "switch");
  expect(onEnterSpy).toBeCalledTimes(2);
});

it("should fire onExit", () => {
  let state = machine.value;
  state = machine.transition(state, "switch");
  expect(onExitSpy).toBeCalledTimes(1);
  machine.transition(state, "switch");
  expect(onExitSpy).toBeCalledTimes(2);
});
