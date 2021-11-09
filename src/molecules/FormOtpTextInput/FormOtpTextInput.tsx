import React, { useState, useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { PressEvent } from 'typings/events';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Box } from 'atoms/Box';
export type OtpInputProps = {
  onSubmit: PressEvent;
};
const CELL_COUNT = 6;

export const FormOtpTextInput = ({ onSubmit, ...rest }: OtpInputProps) => {
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handleChange = useCallback(
    (otp: string) => {
      setValue(otp);
      if (typeof onSubmit === 'function') {
        onSubmit(otp);
      }
    },
    [setValue, onSubmit],
  );
  const focusedColor = '#3B4D75';
  const unFocusedColor = '#E4E9F2';
  const cellInput = useCallback(
    ({ index, symbol, isFocused }) => {
      return (
        <Text
          key={index}
          style={[
            styles.cell,
            { borderColor: unFocusedColor },
            isFocused && { borderColor: focusedColor },
            value.length === CELL_COUNT && { borderColor: focusedColor },
          ]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      );
    },
    [getCellOnLayoutHandler, focusedColor, unFocusedColor, value.length],
  );
  return (
    <Box>
      <CodeField
        {...props}
        value={value}
        onChangeText={handleChange}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="numeric"
        textContentType="oneTimeCode"
        renderCell={cellInput}
        autoFocus
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  codeFieldRoot: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cell: {
    width: 42,
    height: 42,
    lineHeight: 42,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 4,
    textAlign: 'center',
    marginHorizontal: 8,
  },
});
