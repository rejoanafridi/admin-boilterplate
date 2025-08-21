# BaseFormComponent Architecture & Usage Guide

## Overview

The `BaseFormComponent` is a powerful, generic form component built on top of React Hook Form and Zod validation. It provides a declarative way to build complex forms with minimal boilerplate code.

## Architecture

### Core Technologies

- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **TypeScript Generics**: Type-safe form data handling
- **Modular Field System**: Pluggable field components

### Key Features

- 🔧 **Generic & Type-Safe**: Fully typed with TypeScript generics
- 🎯 **Declarative**: Define forms using field configurations
- 🔄 **Real-time Validation**: Zod schema validation with immediate feedback
- 🎨 **Flexible Rendering**: Card layout or standalone rendering
- 🍞 **Built-in Notifications**: Toast integration for success/error states
- ⚡ **Performance Optimized**: Memoized field rendering
- 🔧 **Extensible**: Easy to add custom field types

## Component Structure

```typescript
interface BaseFormComponentProps<T extends z.ZodType> {
  // Core Configuration
  schema: T // Zod validation schema
  fields: FieldDefinition[] // Field definitions array

  // Event Handlers
  onSubmit?: (data: z.infer<T>) => void // Form submission handler
  onChange?: (state: FormState<z.infer<T>>) => void // Form state change handler

  // UI Configuration
  className?: string // Component wrapper class
  cardProps?: ExtendedCardProps // Card layout configuration
  formProps?: FormProps // Form-specific properties
  actionButtons?: ActionButtonConfig // Button configuration

  // State Management
  isLoading?: boolean // External loading state
  defaultValues?: DefaultValues<z.infer<T>> // Initial form values

  // Advanced Hooks
  beforeSubmit?: (
    data: z.infer<T>
  ) => z.infer<T> | false | Promise<z.infer<T> | false>
  afterSubmit?: (data: z.infer<T>, result?: any) => void

  // Toast Configuration
  toastConfig?: ToastConfig // Success/error message config
  handleSubmitInternally?: boolean // Internal submission handling
}
```

## Field Definition System

### Field Definition Interface

```typescript
interface FieldDefinition {
  name: string // Field name (must match schema key)
  type: FieldType // Field component type
  label: string // Display label
  placeholder?: string // Input placeholder
  helperText?: string // Help text below field
  required?: boolean // Required field indicator
  disabled?: boolean // Disabled state
  className?: string // CSS classes for field wrapper
  validation?: ZodSchema // Additional validation rules
  dependencies?: string[] // Fields this depends on
  conditional?: (values: any) => boolean // Conditional rendering
  options?: Option[] // For select/radio/checkbox fields
  multiple?: boolean // For multi-select fields
  accept?: string // For file upload fields
  rows?: number // For textarea fields
  min?: number // For number/date fields
  max?: number // For number/date fields
  step?: number // For number fields
}
```

### Available Field Types

```typescript
type FieldType =
  | 'input' // Text input
  | 'email' // Email input (uses input with type="email")
  | 'password' // Password input
  | 'number' // Number input
  | 'textarea' // Text area
  | 'select' // Single select dropdown
  | 'multi-select' // Multiple select dropdown
  | 'checkbox' // Single checkbox
  | 'radio-group' // Radio button group
  | 'switch' // Toggle switch
  | 'date' // Date picker
  | 'date-range' // Date range picker
  | 'file-upload' // File upload
  | 'asyncSelect' // Async select (fallback to regular select)
```

**Note:** Additional field types are defined in the types but not yet implemented:

- `rich-text`, `phone`, `otp`, `color`, `slider` - These require additional component implementation.

## Usage Examples

### Basic Form

```typescript
import { z } from 'zod'
import { BaseFormComponent } from '@/components/form/form-management'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18 or older')
})

const fields: FieldDefinition[] = [
  {
    name: 'name',
    type: 'input',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    className: 'col-span-12 md:col-span-6'
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
    className: 'col-span-12 md:col-span-6'
  },
  {
    name: 'age',
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
    min: 18,
    max: 100,
    className: 'col-span-12 md:col-span-6'
  }
]

function UserForm() {
  const handleSubmit = (data: z.infer<typeof userSchema>) => {
    console.log('Form submitted:', data)
  }

  return (
    <BaseFormComponent
      schema={userSchema}
      fields={fields}
      onSubmit={handleSubmit}
      cardProps={{
        title: 'User Information'
      }}
      actionButtons={{
        submit: true,
        text: 'Save User',
        loadingText: 'Saving...'
      }}
    />
  )
}
```

### Advanced Form with All Features

```typescript
const advancedSchema = z.object({
  // Text fields
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  bio: z.string().optional(),

  // Selection fields
  country: z.string(),
  skills: z.array(z.string()),
  role: z.enum(['user', 'admin', 'moderator']),

  // Boolean fields
  newsletter: z.boolean(),
  notifications: z.boolean(),

  // Date fields
  birthDate: z.date(),
  availability: z
    .object({
      start: z.date(),
      end: z.date(),
    })
    .optional(),

  // File upload
  avatar: z.instanceof(File).optional(),
})

const advancedFields: FieldDefinition[] = [
  // Personal Information Section
  {
    name: 'firstName',
    type: 'input',
    label: 'First Name',
    required: true,
    className: 'col-span-6',
  },
  {
    name: 'lastName',
    type: 'input',
    label: 'Last Name',
    required: true,
    className: 'col-span-6',
  },
  {
    name: 'bio',
    type: 'textarea',
    label: 'Biography',
    placeholder: 'Tell us about yourself...',
    rows: 4,
    className: 'col-span-12',
  },

  // Selection Fields
  {
    name: 'country',
    type: 'select',
    label: 'Country',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' },
    ],
    className: 'col-span-6',
  },
  {
    name: 'skills',
    type: 'multi-select',
    label: 'Skills',
    options: [
      { label: 'JavaScript', value: 'js' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'React', value: 'react' },
      { label: 'Node.js', value: 'node' },
    ],
    className: 'col-span-6',
  },
  {
    name: 'role',
    type: 'radio-group',
    label: 'Role',
    options: [
      { label: 'User', value: 'user' },
      { label: 'Admin', value: 'admin' },
      { label: 'Moderator', value: 'moderator' },
    ],
    className: 'col-span-12',
  },

  // Boolean Fields
  {
    name: 'newsletter',
    type: 'switch',
    label: 'Subscribe to Newsletter',
    helperText: 'Receive updates about new features',
    className: 'col-span-6',
  },
  {
    name: 'notifications',
    type: 'checkbox',
    label: 'Enable Notifications',
    className: 'col-span-6',
  },

  // Date Fields
  {
    name: 'birthDate',
    type: 'date',
    label: 'Birth Date',
    className: 'col-span-6',
  },
  {
    name: 'availability',
    type: 'date-range',
    label: 'Availability',
    className: 'col-span-6',
  },

  // File Upload
  {
    name: 'avatar',
    type: 'file-upload',
    label: 'Profile Picture',
    accept: 'image/*',
    helperText: 'Upload a profile picture (max 5MB)',
    className: 'col-span-12',
  },
]
```

## Creating Custom Field Types

### 1. Create Field Component

```typescript
// components/form/custom-rating-field.tsx
import { Control, FieldValues, Path } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Star } from 'lucide-react'

interface CustomRatingFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  max?: number
}

export function CustomRatingField<T extends FieldValues>({
  name,
  control,
  label,
  max = 5
}: CustomRatingFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex space-x-1">
              {Array.from({ length: max }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => field.onChange(i + 1)}
                  className={`p-1 ${
                    field.value > i ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
```

### 2. Extend Field Types

```typescript
// Update types.ts
export type FieldType =
  | 'input'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'multi-select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'date'
  | 'date-range'
  | 'file-upload'
  | 'custom-rating' // Add new type

// Update FieldDefinition interface
interface FieldDefinition {
  // ... existing properties
  max?: number // For rating field
}
```

### 3. Update FormField Component

```typescript
// In FormField.tsx, add the new case
case 'custom-rating':
  return (
    <CustomRatingField
      name={field.name as Path<FieldValues>}
      control={control}
      label={field.label}
      max={field.max}
    />
  )
```

## Form State Management

### Real-time Form State

```typescript
const [formState, setFormState] = useState<FormState<UserData>>()

return (
  <BaseFormComponent
    schema={userSchema}
    fields={fields}
    onChange={setFormState}
    onSubmit={handleSubmit}
  />
)

// Access form state
console.log('Form is dirty:', formState?.isDirty)
console.log('Form is valid:', formState?.isValid)
console.log('Current values:', formState?.values)
```

### Advanced Submission Handling

```typescript
const handleBeforeSubmit = async (data: UserData) => {
  // Validate business rules
  if (data.age < 18 && data.role === 'admin') {
    toast('Admins must be 18 or older', { type: 'error' })
    return false // Cancel submission
  }

  // Transform data
  return {
    ...data,
    name: `${data.firstName} ${data.lastName}`
  }
}

const handleAfterSubmit = (data: UserData, result: any) => {
  console.log('Submission successful:', result)
  // Redirect or perform other actions
}

return (
  <BaseFormComponent
    schema={userSchema}
    fields={fields}
    beforeSubmit={handleBeforeSubmit}
    afterSubmit={handleAfterSubmit}
    handleSubmitInternally={true}
    toastConfig={{
      showSuccessToast: true,
      successMessage: 'User created successfully!',
      showErrorToast: true,
      errorMessage: 'Failed to create user'
    }}
  />
)
```

## Best Practices

### 1. Schema Design

```typescript
// ✅ Good: Descriptive error messages
const schema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
})

// ❌ Bad: Generic error messages
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
```

### 2. Field Organization

```typescript
// ✅ Good: Logical grouping and responsive classes
const fields: FieldDefinition[] = [
  // Personal Information
  {
    name: 'firstName',
    type: 'input',
    label: 'First Name',
    className: 'col-span-12 md:col-span-6',
  },
  {
    name: 'lastName',
    type: 'input',
    label: 'Last Name',
    className: 'col-span-12 md:col-span-6',
  },

  // Contact Information
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    className: 'col-span-12 md:col-span-6',
  },
  {
    name: 'phone',
    type: 'input',
    label: 'Phone',
    className: 'col-span-12 md:col-span-6',
  },
]
```

### 3. Performance Optimization

```typescript
// ✅ Good: Memoize expensive computations
const fields = useMemo(
  () => [
    // ... field definitions
  ],
  [dependencies]
)

const schema = useMemo(
  () =>
    z.object({
      // ... schema definition
    }),
  []
)
```

### 4. Error Handling

```typescript
// ✅ Good: Comprehensive error handling
const handleSubmit = async (data: FormData) => {
  try {
    await submitToAPI(data)
  } catch (error) {
    if (error instanceof ValidationError) {
      toast('Please check your input', { type: 'error' })
    } else if (error instanceof NetworkError) {
      toast('Network error. Please try again.', { type: 'error' })
    } else {
      toast('An unexpected error occurred', { type: 'error' })
    }
  }
}
```

## Common Patterns

### Conditional Fields

```typescript
const fields: FieldDefinition[] = [
  {
    name: 'hasAddress',
    type: 'checkbox',
    label: 'I have a different billing address',
  },
  {
    name: 'billingAddress',
    type: 'textarea',
    label: 'Billing Address',
    conditional: (values) => values.hasAddress === true,
  },
]
```

### Dynamic Options

```typescript
const [countries, setCountries] = useState<Option[]>([])

useEffect(() => {
  fetchCountries().then(setCountries)
}, [])

const fields: FieldDefinition[] = [
  {
    name: 'country',
    type: 'select',
    label: 'Country',
    options: countries,
  },
]
```

### Form Sections

```typescript
const formSections = [
  {
    title: 'Personal Information',
    fields: personalFields
  },
  {
    title: 'Contact Details',
    fields: contactFields
  }
]

return (
  <div className="space-y-8">
    {formSections.map((section, index) => (
      <div key={index}>
        <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
        <BaseFormComponent
          schema={sectionSchemas[index]}
          fields={section.fields}
          // ... other props
        />
      </div>
    ))}
  </div>
)
```
