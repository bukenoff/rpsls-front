export type OptionName = "rock" | "paper" | "scissors" | "lizard" | "spock";

export type Option = {
  value: string;
  label: string;
  icon: string;
};

export type Outcome = {
  label: string;
  your_choice: OptionName;
  their_choice: OptionName;
  description: string;
};
