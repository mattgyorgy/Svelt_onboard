export type Option = {
  value: string;
  label: string;
};

export type Question = {
  id: string;
  text: string;
  type: 'text' | 'single-select' | 'multi-select';
  options?: Option[];
  placeholder?: string;
  required?: boolean;
  hasOther?: boolean;
  description?: string;
};