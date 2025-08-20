import { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupProps } from '@/components/ui/radio-group'

type Option = {
  label: string
  value: string
}

interface RadioGroupFieldProps<T extends FieldValues> extends RadioGroupProps {
  name: Path<T>
  control: Control<T>
  label: string
  options: Option[]
  helperText?: string
}

const RadioGroupField = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  helperText,
  ...props
}: RadioGroupFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-col space-y-1"
            {...props}
          >
            {options.map((option) => (
              <FormItem
                key={option.value}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroup.Item value={option.value} />
                </FormControl>
                <FormLabel className="font-normal">{option.label}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        {helperText && <FormDescription>{helperText}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default RadioGroupField
