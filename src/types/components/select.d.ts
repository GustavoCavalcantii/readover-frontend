export type SelectProps = {
    placeholder?: string;
    options: { label: string; value: string }[]; 
    value: string;  // O valor selecionado
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
    styles?: React.CSSProperties;
    disabled?: boolean;
    isFull?: boolean;
  };  