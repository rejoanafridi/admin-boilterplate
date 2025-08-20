import { FormField as BaseFormField } from '@/components/form/form-field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ReactElement, memo } from 'react'
import { FieldDefinition, FieldType } from './types'
import {
  Control,
  UseFormRegister,
  FieldErrors,
  Controller,
} from 'react-hook-form'

interface FormFieldProps {
  field: FieldDefinition
  register: UseFormRegister<any>
  control: Control<any>
  errors: FieldErrors<any>
  isLoading?: boolean
  resetKey?: string | number
}

const FormField = ({
  field,
  register,
  control,
  errors,
  isLoading,
  resetKey,
}: FormFieldProps) => {
  const commonProps = {
    placeholder: field.placeholder,
    disabled: field.disabled || isLoading,
  }

  const renderInput = () => {
    if (field.type === 'textarea') {
      return <Textarea {...register(field.name)} {...commonProps} />
    }

    return (
      <Input
        {...register(field.name)}
        {...commonProps}
        type={
          field.type === 'password'
            ? 'password'
            : field.type === 'email'
            ? 'email'
            : 'text'
        }
      />
    )
  }

  const renderSelect = () => {
    if (!field.options && field.type === 'select') {
      console.error('Select requires options prop')
      return null
    }

    return (
      <Controller
        key={`${field.name}-${resetKey}`}
        name={field.name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger {...commonProps}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    )
  }

  const fieldComponents: Record<FieldType, () => ReactElement<any> | null> = {
    input: renderInput,
    textarea: renderInput,
    select: renderSelect,
    asyncSelect: renderSelect, // Fallback to regular select for now
    password: renderInput,
    email: renderInput,
  }

  const renderComponent = fieldComponents[field.type]

  // Use the current form-field.tsx pattern
  return (
    <BaseFormField
      control={control}
      name={field.name}
      label={field.label}
      description={field.description}
      required={field.required}
      className={field.className}
    >
      {({ value, onChange, onBlur }) => {
        if (field.type === 'select' || field.type === 'asyncSelect') {
          // For select fields, we need to use Controller
          return (
            <Controller
              key={`${field.name}-${resetKey}`}
              name={field.name}
              control={control}
              render={({
                field: { onChange: controllerOnChange, value: controllerValue },
              }) => (
                <Select
                  value={controllerValue}
                  onValueChange={controllerOnChange}
                >
                  <SelectTrigger {...commonProps}>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )
        }

        // For input fields, use the register pattern
        if (field.type === 'textarea') {
          return (
            <Textarea
              {...register(field.name)}
              {...commonProps}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
            />
          )
        }

        return (
          <Input
            {...register(field.name)}
            {...commonProps}
            type={
              field.type === 'password'
                ? 'password'
                : field.type === 'email'
                ? 'email'
                : 'text'
            }
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
          />
        )
      }}
    </BaseFormField>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(FormField)
