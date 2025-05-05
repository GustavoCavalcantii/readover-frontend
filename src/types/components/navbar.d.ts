export type NavbarProps = {
  onChange?: (event: SetStateAction<string>) => void;
  onClick?: () => void;
  placeholder?: string;
  value?: string;
  isSearch?: boolean;
};
