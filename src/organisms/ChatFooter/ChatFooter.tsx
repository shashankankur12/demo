import React, { useState } from 'react';
import { Icon } from 'atoms/Icon';
import { Box } from 'atoms/Box';
import { TextInput } from 'atoms/TextInput';
import { Touch } from 'atoms/Touch';
import { Spinner } from 'atoms/Spinner';
import { Row } from 'atoms/Row';
import { translate } from 'utils/locale';

export const ChatFooter = ({ onSendButtonClick, onAttachment }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <Box style={{ flex: 1, backgroundColor: 'white' }}>
        <Spinner color="primary" />
      </Box>
    );
  }

  const handleSentMessage = async () => {
    await onSendButtonClick(message);
    setMessage('');
  };

  return (
    <Box bg="whiteText" px="m">
      <Row>
        <Touch activeOpacity={1} onPress={onAttachment}>
          <Box
            height={40}
            width={40}
            borderRadius={20}
            bg="lightBlack"
            justifyContent="center"
            alignItems="center">
            <Icon name="Attachment" size={25} onPress={onAttachment} />
          </Box>
        </Touch>
        <Box width={10} />
        <Box width="85%">
          <TextInput
            onChangeText={value => setMessage(value)}
            borderRadius={20}
            value={message}
            keyboardType="default"
            multiline={true}
            maxHeight={60}
            rightIcon="Send"
            onRightIconPress={handleSentMessage}
            placeholder={translate('send.message.text')}
            style={{ color: '#000' }}
          />
        </Box>
      </Row>
    </Box>
  );
};
