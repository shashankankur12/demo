import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useField } from 'formik';
import { TextInputProps } from 'atoms/TextInput';
import { Merge } from 'typings/utils';
import { TextInput as RNTextInput, Animated, StyleSheet } from 'react-native';
import { Box } from 'atoms/Box';
import { FloatingTextInput } from 'atoms/FloatingTextInput';
import { LocaleString } from 'locales/en';
import { translate } from 'utils/locale';
import { Text } from 'atoms/Text';

type InternalFormTextInputProps = {
  name?: string;
  placeholder?: LocaleString | any;
  label?: LocaleString;
  isFocused?: boolean;
  inputMode?: 'flat' | 'outlined';
  nextInputRef?: React.MutableRefObject<RNTextInput> | null;
  values?: Record<string, string>;
  showMaxLength?: boolean;
};

export type FormTextInputProps = Merge<
  Partial<TextInputProps>,
  InternalFormTextInputProps
>;

export const FormTextInput = React.forwardRef<RNTextInput, FormTextInputProps>(
  (
    {
      name,
      maxLength,
      showMaxLength,
      placeholder,
      label,
      values,
      isFocused,
      nextInputRef,
      ...props
    },
    ref,
  ) => {
    const labeledText = useMemo(() => {
      if (label) {
        return translate(label || '');
      }
      return '';
    }, [label]);

    const placeholderText = useMemo(() => {
      if (placeholder) {
        return translate(placeholder || '');
      }
      return '';
    }, [placeholder]);

    const [field, meta, helpers] = useField(name as any);
    const error = meta.touched && meta.error;

    const position = useRef(new Animated.Value(field.value ? 1 : 0)).current;

    const [isFieldActive, setIsFieldActive] = useState(
      field.value ? true : false,
    );

    useEffect(() => {
      if (field.value) {
        setIsFieldActive(true);
      }
    }, [field.value]);

    const handleBlur = useCallback(() => {
      helpers.setTouched(true);
      if (isFieldActive && !field.value && field.value !== undefined) {
        setIsFieldActive(false);

        Animated.timing(position, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }
    }, [field, helpers, isFieldActive, position]);

    const handleSubmitEditing = useCallback(() => {
      nextInputRef?.current?.focus();
    }, [nextInputRef]);

    const returnAnimatedTitleStyles = () => {
      const titleActiveColor = '#3B4D75';
      const titleInactiveColor = '#0F1C21';
      const titleActiveSize = 12;
      const titleInActiveSize = 16;

      const output = {
        top: position.interpolate({
          inputRange: [0, 1],
          outputRange: [9, -14],
        }),
        fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
        color: isFieldActive ? titleActiveColor : titleInactiveColor,
        backgroundColor: 'white',
        padding: 6,
        paddingBottom: 0,
        zIndex: 1,
        left: 12,
      };
      return output;
    };
    if (isFieldActive === true && field.value) {
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    const handleFocus = () => {
      if (!isFieldActive) {
        setIsFieldActive(true);
        helpers.setTouched(true);
        Animated.timing(position, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }
    };
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
      <Box>
        <Animated.Text style={[style.titleStyles, returnAnimatedTitleStyles()]}>
          {labeledText}
        </Animated.Text>

        <FloatingTextInput
          ref={ref as any}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder={isFieldActive ? placeholderText : ''}
          variant={error ? 'error' : undefined}
          errorMessage={error}
          value={field.value}
          onChangeText={field.onChange(name) as any}
          onBlur={handleBlur}
          onFocus={handleFocus}
          maxLength={maxLength}
          onSubmitEditing={handleSubmitEditing}
          style={[errorStyle(), style.textInput]}
          {...props}
        />
        {maxLength && showMaxLength && (
          <Text
            localeId="profile.details.bio.max.char"
            pb="m"
            color="primary"
            variant="bodySmall"
            style={style.limit}
            values={{
              length: maxLength - field.value.length,
              limit: maxLength,
            }}
          />
        )}
      </Box>
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
  limit: {
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});
