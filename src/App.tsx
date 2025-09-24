import { MouseEventHandler, useCallback, useEffect, useState } from "react";

import "./App.css";
import { socket } from "./socket";
import { RPSLS_OPTIONS, ACTIONS } from "./const";
import { OptionName } from "./types";
import { OptionItem } from "./components/OptionItem";
import { OptionList } from "./components/OptionList";

export function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [choice, setChoice] = useState<OptionName>();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [outcome, setOutcome] = useState<any>();

  const handleOptionClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (isOptionSelected) return;
      socket.emit(ACTIONS.SELECT_OPTION, event.currentTarget.value);
    },
    [isOptionSelected],
  );

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onOutcomeSent(outcome: any) {
      setOutcome(outcome);
    }

    function onOptionSelected(option: string) {
      setIsOptionSelected(true);
      setChoice(option as OptionName);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(ACTIONS.OPTION_SELECTED, onOptionSelected);
    socket.on(ACTIONS.GAME_OUTCOME_SENT, onOutcomeSent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(ACTIONS.OPTION_SELECTED, onOptionSelected);
      socket.off(ACTIONS.GAME_OUTCOME_SENT, onOutcomeSent);
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
        </>
      ) : (
        <>
          <h3>Choose your move</h3>
          <OptionList>
            {RPSLS_OPTIONS.map((option) => (
              <OptionItem
                key={option.value}
                disabled={isOptionSelected}
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
