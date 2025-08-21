'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Control, FieldValues, Path } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateRangeFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  placeholder?: string
  helperText?: string
}

const DateRangeField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
}: DateRangeFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !field.value?.from && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value?.from ? (
                  field.value.to ? (
                    <>
                      {format(field.value.from, 'LLL dd, y')} -{' '}
                      {format(field.value.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(field.value.from, 'LLL dd, y')
                  )
                ) : (
                  <span>{placeholder || 'Pick a date range'}</span>
                )}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{ from: field.value?.from, to: field.value?.to }}
              onSelect={field.onChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        {helperText && <FormDescription>{helperText}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default DateRangeField
