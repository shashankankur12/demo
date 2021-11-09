import React from 'react';
import { Icon, IconProps } from 'atoms/Icon';
import { PressEvent } from 'typings/events';
import { Merge } from 'typings/utils';
import { Touch } from 'atoms/Touch';

type CheckBoxProps = Merge<
  {
    checked: boolean;
    onCheck: PressEvent;
  },
  Partial<IconProps>
>;

export const CheckBox = ({ checked, onCheck, ...props }: CheckBoxProps) => {
  return (
    <Touch onPress={onCheck}>
      <Icon
        onPress={onCheck}
        name={checked ? 'checkbox-checked' : 'checkbox-unchecked'}
        color={checked ? '#3B4D75' : '#3B4D75'}
        size={20}
        {...props}
      />
    </Touch>
  );
};
