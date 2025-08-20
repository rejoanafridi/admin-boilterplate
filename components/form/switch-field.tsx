import { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch, SwitchProps } from '@/components/ui/switch'

interface SwitchFieldProps<T extends FieldValues> extends SwitchProps {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
}

const SwitchField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...props
}: SwitchFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <FormLabel className="text-base">{label}</FormLabel>
          {helperText && (
            <FormDescription>{helperText}</FormDescription>
          )}
        </div>
        <FormControl>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            {...props}
          />
        </FormControl>
      </FormItem>
    )}
  />
)

export default SwitchField
