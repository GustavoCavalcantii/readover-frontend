export type BookContainerProps = {
  title: string;
  image?: string | null;
  author: string;
  isAvailable: boolean;
  onClick?: () => void;
  genders: string[];
};
