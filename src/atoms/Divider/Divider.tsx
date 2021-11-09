import React, { FC } from 'react';
import { Box, BoxProps } from 'atoms/Box';

export const Divider: FC<BoxProps> = ({ ...props }) => {
  return <Box height={1} bg="dividerBorderColor" opacity={0.2} {...props} />;
};
