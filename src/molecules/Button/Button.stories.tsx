import React, { FC } from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { Button } from '.';

const style: any = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const CenteredView: FC = ({ children }) => (
  <View style={style}>{children}</View>
);

storiesOf('Button', module)
  .add('filled button', () => {
    return (
      <CenteredView>
        <Button title="account.confirmation.title" />
      </CenteredView>
    );
  })
  .add('outline Button', () => {
    return (
      <CenteredView>
        <Button title="account.confirmation.title" />
      </CenteredView>
    );
  })
  .add('ghost Button', () => {
    return (
      <CenteredView>
        <Button title="account.confirmation.title" />
      </CenteredView>
    );
  });
