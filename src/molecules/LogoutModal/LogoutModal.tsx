import { BottomModal } from 'atoms/BottomModal';
import { Box } from 'atoms/Box';
import { Divider } from 'atoms/Divider';
import { Icon } from 'atoms/Icon';
import { Row } from 'atoms/Row';
import { Text } from 'atoms/Text';
import { Touch } from 'atoms/Touch';
import { Button } from 'molecules/Button';
import React from 'react';
import { PressEvent } from 'typings/utils';

type logoutModalProps = {
  isModalVisible?: boolean;
  onCloseModal?: PressEvent;
  onLogout: PressEvent;
};
export const LogoutModal = ({
  isModalVisible,
  onCloseModal,
  onLogout,
}: logoutModalProps) => {
  return (
    <BottomModal visible={isModalVisible}>
      <Box
        bg="lightBackground"
        width="100%"
        height="30%"
        p="s"
        borderRadius={20}
        alignItems="center">
        <Row width="100%">
          <Touch mt="s" position="absolute" right={0} p="m">
            <Icon size={16} name={'close'} onPress={onCloseModal} />
          </Touch>
          <Text
            variant="boldTitle"
            localeId="logout.modal.confirmation"
            p="l"
          />
        </Row>
        <Divider height={1} width="120%" />

        <Text variant="titleRegular" localeId="logout.modal.text" p="m" />

        <Row>
          <Box width="36%">
            <Touch onPress={onCloseModal}>
              <Button
                alignSelf="center"
                variant="secondary"
                onPress={onCloseModal}
                title="logout.modal.btn.goback"
              />
            </Touch>
          </Box>
          <Box width={20} />
          <Box width="50%">
            <Touch onPress={onLogout}>
              <Button
                alignSelf="center"
                variant="primary"
                onPress={onLogout}
                title="logout.modal.btn.logout"
              />
            </Touch>
          </Box>
        </Row>
      </Box>
    </BottomModal>
  );
};
