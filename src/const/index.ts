import RockIcon from "../assets/rock.svg";
import PaperIcon from "../assets/paper.svg";
import ScissorsIcon from "../assets/scissors.svg";
import LizardIcon from "../assets/lizard.svg";
import SpockIcon from "../assets/spock.svg";

export const RPSLS_OPTIONS = [
  {
    value: "rock",
    label: "Rock",
    icon: RockIcon,
  },
  {
    value: "paper",
    label: "Paper",
    icon: PaperIcon,
  },
  {
    value: "scissors",
    label: "Scissors",
    icon: ScissorsIcon,
  },
  {
    value: "lizard",
    label: "Lizard",
    icon: LizardIcon,
  },
  {
    value: "spock",
    label: "Spock",
    icon: SpockIcon,
  },
] as const;

export const ACTIONS = {
  SELECT_OPTION: "selectOption",
  OPTION_SELECTED: "optionSelected",
  GAME_OUTCOME_SENT: "gameOutcomeSent",
} as const;
