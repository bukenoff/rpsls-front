import { MouseEventHandler, useCallback, useEffect, useState } from "react";

import "./App.css";
import { socket } from "./socket";
import { RPSLS_OPTIONS, ACTIONS } from "./const";
import { Option, OptionName, Outcome } from "./types";
import { OptionItem } from "./components/OptionItem";
import { OptionList } from "./components/OptionList";

export function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [choice, setChoice] = useState<OptionName>();
  const [outcome, setOutcome] = useState<Outcome>();

  const resetState = useCallback(() => {
    socket.emit(ACTIONS.RESET_STATE);
  }, []);

  const handleOptionClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (!!choice) return;
      socket.emit(ACTIONS.SELECT_OPTION, event.currentTarget.value);
    },
    [choice],
  );

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onOutcomeSent(outcome: Outcome) {
      setOutcome(outcome);
    }

    function onOptionSelected(option: string) {
      setChoice(option as OptionName);
    }

    function onStateReset() {
      setChoice(undefined);
      setOutcome(undefined);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(ACTIONS.OPTION_SELECTED, onOptionSelected);
    socket.on(ACTIONS.GAME_OUTCOME_SENT, onOutcomeSent);
    socket.on(ACTIONS.STATE_RESET, onStateReset);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(ACTIONS.OPTION_SELECTED, onOptionSelected);
      socket.off(ACTIONS.GAME_OUTCOME_SENT, onOutcomeSent);
      socket.off(ACTIONS.STATE_RESET, onStateReset);
    };
  }, []);

  if (!isConnected) {
    return "Loading...";
  }

  return (
    <>
      <h1>Rock Paper Scissors</h1>
      {outcome ? (
        <>
          <div>{outcome.label}</div>
          <div>Your choice: {outcome.your_choice}</div>
          <div>Their choice: {outcome.their_choice}</div>
          <div>{outcome.description}</div>
          <button onClick={resetState}>New round</button>
        </>
      ) : (
        <>
          <h3>Choose your move</h3>
          <OptionList>
            {RPSLS_OPTIONS.map((option: Option) => (
              <OptionItem
                key={option.value}
                disabled={!!choice}
                icon={option.icon}
                label={option.label}
                value={option.value}
                onClick={handleOptionClick}
                isSelected={option.value === choice}
              />
            ))}
          </OptionList>
        </>
      )}
    </>
  );
}
