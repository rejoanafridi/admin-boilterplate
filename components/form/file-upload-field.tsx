'use client'

import { UploadCloud, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FileUploadFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  helperText?: string
  multiple?: boolean
}

const FileUploadField = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  multiple = false,
}: FileUploadFieldProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  })
  const [previews, setPreviews] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = multiple
        ? [...(value || []), ...acceptedFiles]
        : acceptedFiles
      onChange(newFiles)

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setPreviews(newPreviews)
    },
    [onChange, value, multiple]
  )

  const handleRemove = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange(newFiles)

    const newPreviews = [...previews]
    URL.revokeObjectURL(newPreviews[index])
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  })

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div
            {...getRootProps()}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-8 text-center',
              isDragActive && 'border-primary'
            )}
          >
            <FormControl>
              <Input {...getInputProps()} />
            </FormControl>
            <UploadCloud className="mb-2 h-8 w-8 text-gray-500" />
            <p className="text-sm text-gray-500">
              {isDragActive
                ? 'Drop the files here...'
                : "Drag 'n' drop some files here, or click to select files"}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="h-24 w-full rounded-md object-cover"
                  onLoad={() => URL.revokeObjectURL(preview)}
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FileUploadField
