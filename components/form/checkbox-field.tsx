'use client';

import { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

interface CheckboxFieldProps<T extends FieldValues> extends CheckboxProps {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
}

const CheckboxField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...props
}: CheckboxFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            {...props}
          />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>{label}</FormLabel>
          {helperText && (
            <FormDescription>{helperText}</FormDescription>
          )}
        </div>
      </FormItem>
    )}
  />
)

export default CheckboxField