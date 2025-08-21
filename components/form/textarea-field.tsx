import { Controller, Control, FieldValues, Path } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Textarea, TextareaProps } from '@/components/ui/textarea'

interface TextareaFieldProps<T extends FieldValues> extends TextareaProps {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
}

const TextareaField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...props
}: TextareaFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea {...field} {...props} />
        </FormControl>
        {helperText && <FormDescription>{helperText}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default TextareaField
