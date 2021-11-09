import React from 'react';
import { Text, TextProps } from 'atoms/Text';
import { Spinner } from 'atoms/Spinner';

type TextButtonProps = {
  loading?: boolean;
} & TextProps;

export const TextButton = ({ loading, ...props }: TextButtonProps) => {
  return loading ? <Spinner color="primary" /> : <Text {...props} />;
};
