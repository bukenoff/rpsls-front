import type { Outcome } from "../../types";

type OutcomeViewProps = {
  outcome: Outcome;
  resetState: () => void;
};

export const OutcomeView = ({ outcome, resetState }: OutcomeViewProps) => {
  return (
    <div>
      <div>{outcome.label}</div>
      <div>Your choice: {outcome.your_choice}</div>
      <div>Their choice: {outcome.their_choice}</div>
      <div>{outcome.description}</div>
      <button onClick={resetState}>New round</button>
    </div>
  );
};
