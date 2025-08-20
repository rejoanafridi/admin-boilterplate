import { Card, CardProps } from '@/components/ui/Card';
import { Form } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useState } from 'react';
import { useForm, DefaultValues } from 'react-hook-form';
import { z } from 'zod';
import FormField from './FormField';
import { FieldDefinition } from './types';
import classNames from '@/utils/classNames';
import { Notification } from '@/components/ui/Notification';
import { toast } from '@/components/ui/toast';

export interface FormState<T> {
  values: T;
  isDirty: boolean;
  isValid: boolean;
}

interface ExtendedCardProps extends Omit<CardProps, 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
}

interface BaseFormComponentProps<T extends z.ZodType> {
  schema: T;
  fields: FieldDefinition[];
  onSubmit?: (data: z.infer<T>) => void;
  onChange?: (state: FormState<z.infer<T>>) => void;
  className?: string;
  cardProps?: ExtendedCardProps;
  formProps?: {
    gridClassName?: string;
    disabled?: boolean;
  };
  actionButtons?: {
    submit?: boolean;
    reset?: boolean;
    text?: string;
    loadingText?: string;
    icon?: React.ReactNode;
    className?: string;
  };
  isLoading?: boolean;
  defaultValues?: DefaultValues<z.infer<T>>;
  beforeSubmit?: (data: z.infer<T>) => z.infer<T> | false | Promise<z.infer<T> | false>;
  afterSubmit?: (data: z.infer<T>, result?: any) => void;
  toastConfig?: {
    showSuccessToast?: boolean;
    successTitle?: string;
    successMessage?: string;
    showErrorToast?: boolean;
    errorTitle?: string;
    errorMessage?: string;
  };
  handleSubmitInternally?: boolean;
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
  const [internalLoading, setInternalLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0); // Add reset key state
  const loading = isLoading || internalLoading;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    watch,
    reset,
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  // Watch all fields
  const watchAllFields = watch();
  // Call onChange when form values change
  useEffect(() => {
    if (onChange) {
      onChange({
        values: watchAllFields,
        isDirty,
        isValid,
      });
    }
  }, [onChange, watchAllFields, isDirty, isValid]);

  // Handle form submission
  const handleFormSubmit = async (data: z.infer<T>) => {
    try {
      // Execute beforeSubmit if provided
      if (beforeSubmit) {
        setInternalLoading(true);
        const modifiedData = await beforeSubmit(data);
        if (modifiedData === false) {
          setInternalLoading(false);
          return; // Cancel submission
        }
        data = modifiedData || data;
      }

      // Execute onSubmit if provided
      if (onSubmit) {
        if (handleSubmitInternally) {
          setInternalLoading(true);
          try {
            const result = await Promise.resolve(onSubmit(data));

            // Show success toast if configured
            if (toastConfig.showSuccessToast) {
              toast.push(
                <Notification title={toastConfig.successTitle} type="success">
                  {toastConfig.successMessage}
                </Notification>
              );
            }

            // Execute afterSubmit callback if provided
            if (afterSubmit) {
              afterSubmit(data, result);
            }
          } catch (error) {
            // Show error toast if configured
            if (toastConfig.showErrorToast) {
              toast.push(
                <Notification title={toastConfig.errorTitle} type="danger">
                  {error instanceof Error ? error.message : toastConfig.errorMessage}
                </Notification>
              );
            }
            console.error('Form submission error:', error);
          } finally {
            setInternalLoading(false);
          }
        } else {
          // Just call onSubmit without handling loading/toasts internally
          onSubmit(data);
        }
      } else if (handleSubmitInternally && afterSubmit) {
        // If no onSubmit but afterSubmit is provided
        afterSubmit(data, reset);
      }
    } catch (error) {
      console.error('Form processing error:', error);
      setInternalLoading(false);

      // Show error toast if configured
      if (toastConfig.showErrorToast) {
        toast.push(
          <Notification title={toastConfig.errorTitle} type="danger">
            {error instanceof Error ? error.message : toastConfig.errorMessage}
          </Notification>
        );
      }
    }
  };

  const renderFields = useMemo(
    () =>
      fields.map((field) => (
        <div key={field.name} className={field.className || 'col-span-12'}>
          <FormField
            field={field}
            register={register}
            control={control}
            errors={errors}
            isLoading={loading}
            resetKey={resetKey}
          />
        </div>
      )),
    [fields, register, control, errors, loading, resetKey]
  );

  const formContent = (
    <div className={classNames('grid grid-cols-12 gap-4', formProps?.gridClassName)}>
      {renderFields}
      <div
        className={classNames(`col-span-12 grid gap-4 ${actionButtons?.className}`, {
          'grid-cols-2': actionButtons.reset,
        })}
      >
        {actionButtons.submit && (
          <Button
            className="col-span-1"
            variant="solid"
            type="submit"
            loading={loading}
            disabled={!isDirty || !isValid || loading}
            icon={actionButtons.icon}
          >
            {loading ? actionButtons.loadingText : actionButtons.text}
          </Button>
        )}
        {actionButtons.reset && (
          <Button
            className="col-span-1"
            variant="solid"
            onClick={() => {
              reset();
              setResetKey((prev) => prev + 1); // Increment reset key to force remount
            }}
            // type="reset"
            loading={loading}
            disabled={loading}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );

  const content = (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <fieldset disabled={formProps?.disabled || loading}>{formContent}</fieldset>
    </Form>
  );

  if (cardProps) {
    const { title, extra, ...restCardProps } = cardProps;
    return (
      <Card {...restCardProps} className={className}>
        {title && <div className="mb-4">{title}</div>}
        {content}
        {extra && <div className="mt-4">{extra}</div>}
      </Card>
    );
  }

  return <div className={className}>{content}</div>;
};

export default BaseFormComponent;
