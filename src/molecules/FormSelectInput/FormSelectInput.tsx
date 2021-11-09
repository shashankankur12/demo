import React, { useCallback } from 'react';
import { useField } from 'formik';
import { Option, SelectInput, SelectInputProps } from '../SelectInput';
import { LocaleString } from 'locales/en';

import { Merge, PressEvent } from 'typings/utils';

type FormSelectInputProps = Merge<
  {
    name: string;
    placeholder: LocaleString;
    options: Option[];
    onChange: PressEvent;
    values?: string;
    disabled?: boolean;
  },
  SelectInputProps
>;

export const FormSelectInput = ({
  name,
  placeholder,
  options,
  onChange,
  ...props
}: FormSelectInputProps) => {
  const [, meta, helpers] = useField(name as string);
  const error = meta.touched && meta.error;
  const { value } = meta;

  const handleChange = useCallback(
    newValue => {
      helpers.setValue(newValue.label, true);

      if (onChange && typeof onChange === 'function') {
        onChange(newValue);
      }
    },
    [helpers, onChange],
  );
  return (
    <SelectInput
      name={name}
      disabled={false}
      options={options}
      value={options?.find(item => item.label === value)}
      error={error as LocaleString}
      placeholder={placeholder}
      onChange={handleChange}
      {...props}
    />
  );
};
