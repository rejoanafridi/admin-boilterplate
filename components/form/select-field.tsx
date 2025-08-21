'use client'

import { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Option = {
  label: string
  value: string
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  options: Option[]
  placeholder?: string
  helperText?: string
}

const SelectField = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  helperText,
}: SelectFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {helperText && <FormDescription>{helperText}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default SelectField
