export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'asyncSelect'
  | 'password'
  | 'email'
  | 'number'
  | 'multi-select'
  | 'checkbox'
  | 'radio-group'
  | 'switch'
  | 'date'
  | 'date-range'
  | 'file-upload'
  | 'rich-text'
  | 'phone'
  | 'otp'
  | 'color'
  | 'slider'

export interface FieldDefinition {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  disabled?: boolean
  className?: string
  required?: boolean
  description?: string
  // AsyncSelect specific props
  apiUrl?: string
  queryKey?: string
  optLabelKey?: string
  optValueKey?: string
  isMulti?: boolean
  isClearable?: boolean
  // Select specific props
  options?: Array<{ label: string; value: string }>
  // Conditional rendering
  condition?: (values: any) => boolean
}
