import { memo } from 'react'
import { Control } from 'react-hook-form'

import CheckboxField from '../checkbox-field'
import DateField from '../date-field'
import DateRangeField from '../date-range-field'
import FileUploadField from '../file-upload-field'
import InputField from '../input-field'
import MultiSelectField from '../multi-select-field'
import NumberField from '../number-field'
import PasswordField from '../password-field'
import RadioGroupField from '../radio-group-field'
import SelectField from '../select-field'
import SwitchField from '../switch-field'
import TextareaField from '../textarea-field'

import { FieldDefinition } from './types'

interface FormFieldProps {
  field: FieldDefinition
  control: Control<any>
  isLoading?: boolean
  resetKey?: string | number
}

const FormField = ({ field, control, isLoading }: FormFieldProps) => {
  const commonProps = {
    name: field.name,
    control,
    label: field.label,
    placeholder: field.placeholder,
    helperText: field.description,
    disabled: field.disabled || isLoading,
  }

  const fieldComponents = {
    input: <InputField {...commonProps} />,
    textarea: <TextareaField {...commonProps} />,
    select: <SelectField {...commonProps} options={field.options || []} />,
    password: <PasswordField {...commonProps} />,
    email: <InputField {...commonProps} type="email" />,
    number: <NumberField {...commonProps} />,
    'multi-select': (
      <MultiSelectField {...commonProps} options={field.options || []} />
    ),
    checkbox: <CheckboxField {...commonProps} />,
    'radio-group': (
      <RadioGroupField {...commonProps} options={field.options || []} />
    ),
    switch: <SwitchField {...commonProps} />,
    date: <DateField {...commonProps} />,
    'date-range': <DateRangeField {...commonProps} />,
    'file-upload': <FileUploadField {...commonProps} />,
    // Fallbacks for unhandled types
    asyncSelect: <SelectField {...commonProps} options={field.options || []} />,
  }

  const component = fieldComponents[field.type as keyof typeof fieldComponents]

  if (!component) {
    console.error(`Unsupported field type: ${field.type}`)
    return null
  }

  // Conditional rendering based on field definition
  if (field.condition && !field.condition(control._formValues)) {
    return null
  }

  return <div className={field.className}>{component}</div>
}

export default memo(FormField)
