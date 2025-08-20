'use client'

import { Control, FieldValues, Path, useController } from 'react-hook-form'
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
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Option = {
  label: string
  value: string
}

interface MultiSelectFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  options: Option[]
  placeholder?: string
  helperText?: string
  className?: string
}

const MultiSelectField = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  helperText,
  className,
}: MultiSelectFieldProps<T>) => {
  const {
    field: { value = [], onChange },
  } = useController({
    name,
    control,
  })

  const handleSelect = (selectedValue: string) => {
    if (!value.includes(selectedValue)) {
      onChange([...value, selectedValue])
    }
  }

  const handleRemove = (selectedValue: string) => {
    onChange(value.filter((val: string) => val !== selectedValue))
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={handleSelect}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={value.includes(option.value)}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 pt-2">
            {value.map((val: string) => {
              const option = options.find((opt) => opt.value === val)
              return (
                <Badge key={val} variant="secondary">
                  {option?.label}
                  <button
                    type="button"
                    className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => handleRemove(val)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              )
            })}
          </div>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default MultiSelectField
