/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
  RefAttributes,
  ForwardRefExoticComponent,
  useCallback,
  useMemo,
} from 'react';
import { Menu } from 'react-native-paper';
import { Touch } from 'atoms/Touch';
import { Keyboard, StyleSheet } from 'react-native';
import { LocaleString } from 'locales/en';
import { FloatingTextInput } from 'atoms/FloatingTextInput';
import { translate } from 'utils/locale';
import { useField } from 'formik';

export type Option = {
  label: string;
  id: string | number;
  isShow?: boolean;
  attribute_id?: string;
  is_active?: boolean;
};

export type SelectInputProps = {
  name?: string;
  placeholder: LocaleString;
  options?: Array<Option>;
  onChange?(option: Option): void;
  value?: Option;
  resetOnSelect?: boolean;
  disabled?: boolean;
  isFocused?: boolean;
};

export type SelectInputRef = {
  reset: () => void;
};
type T = ForwardRefExoticComponent<
  SelectInputProps & {
    children?: React.ReactNode;
    error?: LocaleString | false;
  } & RefAttributes<SelectInputRef>
>;
export const SelectInput: T = forwardRef(
  (
    {
      name,
      placeholder,
      disabled,
      onChange,
      value,
      options = [],
      error,
      isFocused,
    },
    ref,
  ) => {
    const [field] = useField(name);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<Option | null>(value || null);
    const [isFieldActive, setIsFieldActive] = useState(
      field.value ? true : false,
    );
    useEffect(() => {
      if (field.value) {
        const defaultValue = options?.filter(
          item => item.label.toLowerCase() === field.value.toLowerCase(),
        );
        if (defaultValue.length > 0) {
          setSelected(defaultValue[0]);
        }
        setIsFieldActive(true);
      }
    }, [field.value]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setSelected(null);
      },
      placeholder,
    }));

    const placeholderText = useMemo(() => {
      if (placeholder) {
        return translate(placeholder || '');
      }
      return '';
    }, [placeholder]);

    const onDismiss = useCallback(() => {
      setVisible(false);
    }, []);
    const openMenu = () => {
      setVisible(true);
      Keyboard.dismiss();
    };
    const handleChange = useCallback(
      (option: Option) => () => {
        onDismiss();
        if (typeof onChange === 'function') {
          onChange(option);
          setSelected(option);
        }
      },
      [onDismiss, onChange],
    );

    const errorStyle = () => {
      if (error) {
        return style.isError;
      } else if (isFieldActive || isFocused) {
        return style.isFocusStyle;
      } else {
        return style.isFocusStyleDisable;
      }
    };
    return (
      <>
        <Menu
          visible={!disabled && visible}
          onDismiss={onDismiss}
          style={{ width: '90%' }}
          anchor={
            <Touch width="100%" onPress={openMenu}>
              <FloatingTextInput
                rightIcon="drop-down"
                value={selected?.label ?? value?.label}
                placeholder={placeholderText}
                placeholderTextColor="#0F1C21"
                containerProps={{ pointerEvents: 'none' }}
                editable={false}
                variant={error ? 'error' : undefined}
                errorMessage={error}
                style={[style.textInput, errorStyle()]}
              />
            </Touch>
          }>
          {options.map((option, index) => (
            <Menu.Item
              disabled={disabled}
              contentStyle={{ width: '100%' }}
              key={index.toString()}
              onPress={handleChange(option)}
              title={option.label}
            />
          ))}
        </Menu>
      </>
    );
  },
);
const style = StyleSheet.create({
  textInput: {
    color: '#000',
  },
  titleStyles: {
    position: 'absolute',

    color: '#000',
    justifyContent: 'center',
    textAlign: 'center',
  },
  isFocusStyle: {
    borderColor: '#3B4D75',
  },
  isFocusStyleDisable: {
    borderColor: '#E4E9F2',
  },
  isError: {
    borderColor: '#F8133F',
  },
});
