export const RPSLS_OPTIONS: { value: string; label: string; icon: string }[] = [
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
] as const;

export const ACTIONS = {
  SELECT_OPTION: "selectOption",
  OPTION_SELECTED: "optionSelected",
  GAME_OUTCOME_SENT: "gameOutcomeSent",
} as const;
