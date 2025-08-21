import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useEffect, useState } from 'react'
import { useForm, DefaultValues, FormProvider } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

import FormField from './FormField'
import { FieldDefinition } from './types'

export interface FormState<T> {
  values: T
  isDirty: boolean
  isValid: boolean
}

interface ExtendedCardProps
  extends Omit<React.ComponentProps<typeof Card>, 'title'> {
  title?: React.ReactNode
  extra?: React.ReactNode
}

interface BaseFormComponentProps<T extends z.ZodType> {
  schema: T
  fields: FieldDefinition[]
  onSubmit?: (data: z.infer<T>) => void
  onChange?: (state: FormState<z.infer<T>>) => void
  className?: string
  cardProps?: ExtendedCardProps
  formProps?: {
    gridClassName?: string
    disabled?: boolean
  }
  actionButtons?: {
    submit?: boolean
    reset?: boolean
    text?: string
    loadingText?: string
    icon?: React.ReactNode
    className?: string
  }
  isLoading?: boolean
  defaultValues?: DefaultValues<z.infer<T>>
  beforeSubmit?: (
    data: z.infer<T>
  ) => z.infer<T> | false | Promise<z.infer<T> | false>
  afterSubmit?: (data: z.infer<T>, result?: any) => void
  toastConfig?: {
    showSuccessToast?: boolean
    successTitle?: string
    successMessage?: string
    showErrorToast?: boolean
    errorTitle?: string
    errorMessage?: string
  }
  handleSubmitInternally?: boolean
}

const BaseFormComponent = <T extends z.ZodType>({
  schema,
  fields,
  onSubmit,
  onChange,
  className = '',
  cardProps,
  formProps,
  actionButtons = { submit: true },
  isLoading = false,
  defaultValues,
  beforeSubmit,
  afterSubmit,
  toastConfig = {
    showSuccessToast: false,
    successTitle: 'Success',
    successMessage: 'Operation completed successfully',
    showErrorToast: false,
    errorTitle: 'Error',
    errorMessage: 'An error occurred',
  },
  handleSubmitInternally = false,
}: BaseFormComponentProps<T>) => {
  const [internalLoading, setInternalLoading] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const loading = isLoading || internalLoading
  const { toast } = useToast()

  const formMethods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  })

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    watch,
    reset,
  } = formMethods

  // Watch all fields
  const watchAllFields = watch()
  // Call onChange when form values change
  useEffect(() => {
    if (onChange) {
      onChange({
        values: watchAllFields,
        isDirty,
        isValid,
      })
    }
  }, [onChange, watchAllFields, isDirty, isValid])

  // Handle form submission
  const handleFormSubmit = async (data: z.infer<T>) => {
    try {
      // Execute beforeSubmit if provided
      if (beforeSubmit) {
        setInternalLoading(true)
        const modifiedData = await beforeSubmit(data)
        if (modifiedData === false) {
          setInternalLoading(false)
          return // Cancel submission
        }
        data = modifiedData || data
      }

      // Execute onSubmit if provided
      if (onSubmit) {
        if (handleSubmitInternally) {
          setInternalLoading(true)
          try {
            const result = await Promise.resolve(onSubmit(data))

            // Show success toast if configured
            if (toastConfig.showSuccessToast) {
              toast(toastConfig.successMessage || 'Success', {
                type: 'success',
              })
            }

            // Execute afterSubmit callback if provided
            if (afterSubmit) {
              afterSubmit(data, result)
            }
          } catch (error) {
            // Show error toast if configured
            if (toastConfig.showErrorToast) {
              toast(
                error instanceof Error
                  ? error.message
                  : toastConfig.errorMessage || 'An error occurred',
                { type: 'error' }
              )
            }
            console.error('Form submission error:', error)
          } finally {
            setInternalLoading(false)
          }
        } else {
          // Just call onSubmit without handling loading/toasts internally
          onSubmit(data)
        }
      } else if (handleSubmitInternally && afterSubmit) {
        // If no onSubmit but afterSubmit is provided
        afterSubmit(data, reset)
      }
    } catch (error) {
      console.error('Form processing error:', error)
      setInternalLoading(false)

      // Show error toast if configured
      if (toastConfig.showErrorToast) {
        toast(
          error instanceof Error
            ? error.message
            : toastConfig.errorMessage || 'An error occurred',
          { type: 'error' }
        )
      }
    }
  }

  const renderFields = useMemo(
    () =>
      fields.map((field) => (
        <div key={field.name} className={field.className || 'col-span-12'}>
          <FormField
            field={field}
            control={control}
            isLoading={loading}
            resetKey={resetKey}
          />
        </div>
      )),
    [fields, control, loading, resetKey]
  )

  const formContent = (
    <div className={cn('grid grid-cols-12 gap-4', formProps?.gridClassName)}>
      {renderFields}
      <div
        className={cn(`col-span-12 grid gap-4 ${actionButtons?.className}`, {
          'grid-cols-2': actionButtons.reset,
        })}
      >
        {actionButtons.submit && (
          <Button
            className="col-span-1"
            type="submit"
            disabled={!isDirty || !isValid || loading}
          >
            {loading ? actionButtons.loadingText : actionButtons.text}
          </Button>
        )}
        {actionButtons.reset && (
          <Button
            className="col-span-1"
            variant="outline"
            onClick={() => {
              reset()
              setResetKey((prev) => prev + 1)
            }}
            disabled={loading}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  )

  const content = (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset disabled={formProps?.disabled || loading}>
          {formContent}
        </fieldset>
      </form>
    </FormProvider>
  )

  if (cardProps) {
    const { title, extra, ...restCardProps } = cardProps
    return (
      <>
        {title && <div className="mb-4">{title}</div>}
        {content}
        {extra && <div className="mt-4">{extra}</div>}
      </>
    )
  }

  return <div className={className}>{content}</div>
}

export default BaseFormComponent
