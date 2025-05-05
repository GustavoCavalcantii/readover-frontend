export type ButtonProps = {
  placeholder: string;
  type?: "button" | "submit" | "reset";
  styles?: React.CSSProperties;
  isInverted?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  isFull?: boolean;
};
