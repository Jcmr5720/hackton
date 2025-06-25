import React from 'react'

export interface Option {
  value: string
  label: string
}

interface Props {
  classNamePrefix?: string
  options: Option[]
  value: Option | null
  onChange: (option: Option | null) => void
  placeholder?: string
  isDisabled?: boolean
}

export default function CustomSelect({
  classNamePrefix,
  options,
  value,
  onChange,
  placeholder,
  isDisabled
}: Props) {
  return (
    <select
      className={`form-select ${classNamePrefix ? classNamePrefix + '__control' : ''}`}
      value={value?.value ?? ''}
      onChange={e => {
        const selected = options.find(o => o.value === e.target.value) || null
        onChange(selected)
      }}
      disabled={isDisabled}
    >
      <option value="" disabled>
        {placeholder || 'Seleccione'}
      </option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
