'use client'

import { Minus, Plus } from 'lucide-react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface NumberFieldProps<T extends FieldValues>
  extends Omit<InputProps, 'onChange'> {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
  stepper?: boolean
  min?: number
  max?: number
  step?: number
}

const NumberField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  stepper = true,
  className,
  min,
  max,
  step,
  ...props
}: NumberFieldProps<T>) => {
  const {
    field: { onChange, ...field },
  } = useController({
    name,
    control,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value === '' ? '' : Number(value))
  }

  const handleStep = (increment: number) => {
    const currentValue =
      typeof field.value === 'number' && !isNaN(field.value) ? field.value : 0
    onChange(currentValue + increment)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type="number"
                {...field}
                {...props}
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
                className={cn({ 'pr-16': stepper }, className)}
              />
            </FormControl>
            {stepper && (
              <div className="absolute right-0 top-0 flex h-full items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-full rounded-l-none border-l-0"
                  onClick={() => handleStep(1)}
                  tabIndex={-1}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-full rounded-r-none border-r-0"
                  onClick={() => handleStep(-1)}
                  tabIndex={-1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default NumberField
