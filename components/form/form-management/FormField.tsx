import { FormItem } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import AsyncMultiSelect from '@/components/shared/AsyncMultiSelect';
import { ReactElement, memo } from 'react';
import { FieldDefinition, FieldType } from './types';
import { Control, UseFormRegister, FieldErrors, Controller } from 'react-hook-form';

interface FormFieldProps {
  field: FieldDefinition;
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
  isLoading?: boolean;
  resetKey?: string | number; // Add resetKey to force remount
}

const FormField = ({ field, register, control, errors, isLoading, resetKey }: FormFieldProps) => {
  const commonProps = {
    placeholder: field.placeholder,
    disabled: field.disabled || isLoading,
  };

  const renderInput = () => (
    <Input {...register(field.name)} {...commonProps} textArea={field.type === 'textarea'} />
  );

  const renderSelect = () => {
    if (!field.options && field.type === 'select') {
      console.error('Select requires options prop');
      return null;
    }

    const selectProps = {
      ...commonProps,
      isMulti: field.isMulti,
      isClearable: field.isClearable,
    };

    if (field.type === 'asyncSelect') {
      if (!field.apiUrl || !field.queryKey) {
        console.error('AsyncSelect requires apiUrl and queryKey props');
        return null;
      }

      return (
        <Controller
          key={`${field.name}-${resetKey}`} // Force remount on reset
          name={field.name}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <AsyncMultiSelect
                {...selectProps}
                value={value}
                onChange={onChange}
                api_url={field.apiUrl || ''}
                queryKey={field.queryKey || ''}
                optLabelKey={field.optLabelKey}
                optValueKey={field.optValueKey}
              />
            );
          }}
        />
      );
    }

    return (
      <Controller
        key={`${field.name}-${resetKey}`} // Force remount on reset
        name={field.name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <AsyncMultiSelect
            {...selectProps}
            value={value}
            onChange={onChange}
            queryKey="static"
            options={field.options}
          />
        )}
      />
    );
  };

  const fieldComponents: Record<FieldType, () => ReactElement | null> = {
    input: renderInput,
    textarea: renderInput,
    select: renderSelect,
    asyncSelect: renderSelect,
  };

  const renderComponent = fieldComponents[field.type];

  return (
    <FormItem
      label={field.label}
      invalid={!!errors[field.name]}
      errorMessage={errors[field.name]?.message as string}
    >
      {renderComponent()}
    </FormItem>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(FormField);
