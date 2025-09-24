import type { Option } from "../types";

export const RPSLS_OPTIONS: Option[] = [
  {
    value: "rock",
    label: "Rock",
    icon: "🪨",
  },
  {
    value: "paper",
    label: "Paper",
    icon: "📃",
  },
  {
    value: "scissors",
    label: "Scissors",
    icon: "✂️",
  },
  {
    value: "lizard",
    label: "Lizard",
    icon: "🦎",
  },
  {
    value: "spock",
    label: "Spock",
    icon: "🖖",
  },
];

export const ACTIONS = {
  SELECT_OPTION: "selectOption",
  OPTION_SELECTED: "optionSelected",
  GAME_OUTCOME_SENT: "gameOutcomeSent",
} as const;
