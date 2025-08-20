export type FieldType = 'input' | 'textarea' | 'select' | 'asyncSelect';

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  // AsyncSelect specific props
  apiUrl?: string;
  queryKey?: string;
  optLabelKey?: string;
  optValueKey?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  // Select specific props
  options?: Array<{ label: string; value: string }>;
  // Conditional rendering
  condition?: (values: any) => boolean;
}
