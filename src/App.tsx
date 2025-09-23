import {
  createElement,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";

import "./App.css";
import { socket } from "./socket";
import { RPSLS_OPTIONS, ACTIONS } from "./const";
import { ICONS } from "./assets";
import { OptionName } from "./types";
import { OptionItem } from "./components/OptionItem/OptionItem";

export function App() {
  console.log("socket is", socket);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [choice, setChoice] = useState<OptionName>();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [outcome, setOutcome] = useState<any>();

  const handleOptionClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (isOptionSelected) return;
      console.log("event val", event.currentTarget.value);
      socket.emit(ACTIONS.SELECT_OPTION, event.currentTarget.value);
    },
    [isOptionSelected],
  );

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("hello I am here");
    }

    function onDisconnect() {
      setIsConnected(false);

      console.log("hello I am onDisconnect");
    }

    function onOutcomeSent(outcome: any) {
      setOutcome(outcome);
      console.log("Outcome is", outcome);
    }

    function onOptionSelected(option: string) {
      console.log("option was selected on server", option);
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
          <ul className="options">
            {RPSLS_OPTIONS.map((option: any) => (
              <OptionItem
                key={option.value}
                disabled={isOptionSelected}
                label={option.label}
                value={option.value}
                onClick={handleOptionClick}
                isSelected={option.value === choice}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
