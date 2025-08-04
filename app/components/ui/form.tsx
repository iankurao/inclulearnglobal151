"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form"
import { ChevronDown, X } from "lucide-react"

import { cn } from "@/app/lib/utils"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Switch } from "@/app/components/ui/switch"
import { Slider } from "@/app/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import { format } from "date-fns"
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group"
import { Badge } from "@/app/components/ui/badge"

const Form = FormProvider

const FormField = ({ name, ...props }: React.ComponentProps<typeof Controller>) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return props.children({
          ...field,
          invalid: !!error,
          errors: error?.message,
        })
      }}
      {...props}
    />
  )
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("space-y-2", className)} {...props} />
  },
)
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<React.ElementRef<typeof Label>, React.ComponentPropsWithoutRef<typeof Label>>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />
  },
)
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    )
  },
)
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p ref={ref} id={formDescriptionId} className={cn("text-[0.8rem] text-muted-foreground", className)} {...props} />
    )
  },
)
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
      return null
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-[0.8rem] font-medium text-destructive", className)}
        {...props}
      >
        {body}
      </p>
    )
  },
)
FormMessage.displayName = "FormMessage"

const FormInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentPropsWithoutRef<typeof Input>>(
  ({ ...props }, ref) => {
    const { name, invalid, onChange, value } = useFormField()
    return <Input name={name} ref={ref} onChange={onChange} value={value} aria-invalid={invalid} {...props} />
  },
)
FormInput.displayName = "FormInput"

const FormTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  React.ComponentPropsWithoutRef<typeof Textarea>
>(({ ...props }, ref) => {
  const { name, invalid, onChange, value } = useFormField()
  return <Textarea name={name} ref={ref} onChange={onChange} value={value} aria-invalid={invalid} {...props} />
})
FormTextarea.displayName = "FormTextarea"

const FormSelect = React.forwardRef<
  React.ElementRef<typeof SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectTrigger> & {
    options: { label: string; value: string }[]
    placeholder?: string
  }
>(({ options, placeholder, className, ...props }, ref) => {
  const { name, onChange, value, invalid } = useFormField()

  return (
    <Select onValueChange={onChange} value={value} name={name}>
      <FormControl>
        <SelectTrigger ref={ref} className={cn(invalid && "border-destructive", className)} {...props}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
})
FormSelect.displayName = "FormSelect"

const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  React.ComponentPropsWithoutRef<typeof Checkbox>
>(({ ...props }, ref) => {
  const { name, onChange, value, invalid } = useFormField()
  return <Checkbox name={name} ref={ref} onCheckedChange={onChange} checked={value} aria-invalid={invalid} {...props} />
})
FormCheckbox.displayName = "FormCheckbox"

const FormRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  React.ComponentPropsWithoutRef<typeof RadioGroup> & {
    options: { label: string; value: string }[]
  }
>(({ options, className, ...props }, ref) => {
  const { name, onChange, value, invalid } = useFormField()
  return (
    <RadioGroup
      name={name}
      ref={ref}
      onValueChange={onChange}
      value={value}
      aria-invalid={invalid}
      className={cn("flex flex-col space-y-1", className)}
      {...props}
    >
      {options.map((option) => (
        <div className="flex items-center space-x-3 space-y-0" key={option.value}>
          <FormControl>
            <RadioGroupItem value={option.value} />
          </FormControl>
          <FormLabel>{option.label}</FormLabel>
        </div>
      ))}
    </RadioGroup>
  )
})
FormRadioGroup.displayName = "FormRadioGroup"

const FormSwitch = React.forwardRef<React.ElementRef<typeof Switch>, React.ComponentPropsWithoutRef<typeof Switch>>(
  ({ ...props }, ref) => {
    const { name, onChange, value, invalid } = useFormField()
    return <Switch name={name} ref={ref} onCheckedChange={onChange} checked={value} aria-invalid={invalid} {...props} />
  },
)
FormSwitch.displayName = "FormSwitch"

const FormSlider = React.forwardRef<React.ElementRef<typeof Slider>, React.ComponentPropsWithoutRef<typeof Slider>>(
  ({ ...props }, ref) => {
    const { name, onChange, value, invalid } = useFormField()
    return <Slider name={name} ref={ref} onValueChange={onChange} value={value} aria-invalid={invalid} {...props} />
  },
)
FormSlider.displayName = "FormSlider"

const FormDatePicker = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  React.ComponentPropsWithoutRef<typeof PopoverTrigger> & {
    placeholder?: string
  }
>(({ placeholder, ...props }, ref) => {
  const { name, onChange, value, invalid } = useFormField()
  return (
    <Popover>
      <FormControl>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              invalid && "border-destructive",
            )}
            ref={ref}
            {...props}
          >
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
            <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
      </FormControl>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
})
FormDatePicker.displayName = "FormDatePicker"

const FormToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroup>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup> & {
    options: { label: string; value: string; icon?: React.ElementType }[]
    type?: "single" | "multiple"
  }
>(({ options, type = "single", className, ...props }, ref) => {
  const { name, onChange, value, invalid } = useFormField()

  const handleValueChange = (newValue: string | string[]) => {
    if (type === "single" && Array.isArray(newValue)) {
      onChange(newValue[0] || "")
    } else {
      onChange(newValue)
    }
  }

  return (
    <ToggleGroup
      type={type}
      onValueChange={handleValueChange}
      value={value}
      aria-invalid={invalid}
      className={cn(className)}
      ref={ref}
      {...props}
    >
      {options.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value} aria-label={option.label}>
          {option.icon && <option.icon className="mr-2 h-4 w-4" />}
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
})
FormToggleGroup.displayName = "FormToggleGroup"

const FormTagsInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & {
    tags: string[]
    onTagsChange: (tags: string[]) => void
  }
>(({ tags, onTagsChange, className, ...props }, ref) => {
  const [inputValue, setInputValue] = React.useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault()
      const newTag = inputValue.trim()
      if (!tags.includes(newTag)) {
        onTagsChange([...tags, newTag])
      }
      setInputValue("")
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      e.preventDefault()
      const newTags = tags.slice(0, tags.length - 1)
      onTagsChange(newTags)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-within:ring-1 focus-within:ring-ring",
        className,
      )}
    >
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
          {tag}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0"
            onClick={() => handleRemoveTag(tag)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {tag}</span>
          </Button>
        </Badge>
      ))}
      <Input
        ref={ref}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={tags.length === 0 ? "Add tags..." : ""}
        className="flex-1 border-none p-0 shadow-none focus-visible:ring-0"
        {...props}
      />
    </div>
  )
})
FormTagsInput.displayName = "FormTagsInput"

function useFormField() {
  const fieldContext = useFormContext()
  const itemContext = React.useContext(FormItemContext)

  const { name } = itemContext

  if (!name) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const {
    formState: { errors, isSubmitting },
    control,
    ...rest
  } = fieldContext

  const error = errors[name]
  const formItemId = React.useId()
  const formDescriptionId = React.useId()
  const formMessageId = React.useId()

  return {
    name,
    formItemId,
    formDescriptionId,
    formMessageId,
    error,
    isSubmitting,
    control,
    ...rest,
  }
}

type FormItemContextValue = {
  name: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormRadioGroup,
  FormSwitch,
  FormSlider,
  FormDatePicker,
  FormToggleGroup,
  FormTagsInput,
  useFormField,
}
