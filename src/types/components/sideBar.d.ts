export interface SidebarProps {
    allGenders: string[];
    selectedGenders: string[];
    onToggleGender: (gender: string) => void;
  }