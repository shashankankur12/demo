import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from 'atoms/Box';
import { NotificationNavbar } from 'molecules/NotificationNavbar';
import { Text } from 'atoms/Text';
import { ImageBase } from 'atoms/Image';
import { IMAGES } from 'utils/staticAssets';
import { ChatList } from 'molecules/ChatList';
import socketIO from 'socket.io-client';
import Config from 'react-native-config';
import useAuth from 'context/Authentication';
import { api } from 'utils/api/api';
import { ImagePickerModal } from 'molecules/ImagePickerModal';
import { ImageType } from 'typings/general.types';
import { ChatFooter } from 'organisms/ChatFooter/ChatFooter';
import { KeyboardAvoidingView } from 'react-native';
import { isIOS } from 'utils/device';
import { Spinner } from 'atoms/Spinner';

export const ChatSection = ({ recepientId }) => {
  const socket = socketIO(Config.API_HOST + '/');
  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState([]);

  const sheetRef = useRef(null);

  const {
    state: { userData },
    actions: { handleImageUpload },
  } = useAuth();

  const messageRecieved = useCallback((message: any) => {
    if (
      userData?.id === message?.recepient_id &&
      recepientId === message?.sender_id
    ) {
      setChatData((prev: any) => [...prev, message]);
    }
  }, []);

  const connectWithServer = useCallback(async () => {
    socket.once('connect', () => {});
    socket.once('disconnect', () => {});
    socket.emit('joinRoom', userData?.id);
    socket.emit('markMessageRead', recepientId);
    socket.on('newChat', (message: any) => messageRecieved(message));
    socket.once('joinedRoom', () => {
      setLoading(false);
    });
  }, [socket, userData, recepientId, messageRecieved]);

  const fetchHistoryChat = useCallback(async () => {
    setLoading(true);
    if (recepientId) {
      try {
        const { data } = await api.get(
          `/v1/chat/get-messages?sender_id=${userData?.id}&reciever_id=${recepientId}`,
        );
        setChatData(data?.data?.chats);
      } catch (e) {
        console.error('', e);
      }
    }
  }, [userData, recepientId]);

  const sendMessage = (message: string) => {
    if (message && message.replace(/\s/g, '').length) {
      emitMessage(message.trim(), '');
    }
  };

  const sendImageData = (url: any) => {
    emitMessage('', url);
  };
  const emitMessage = useCallback(
    (message: string, imageUrl: string) => {
      const payload: any = {
        senderId: userData?.id,
        recepientId: recepientId,
        createdAt: new Date(),
        message,
        imageUrl,
      };
      socket.emit('chat', payload);
      payload.sender_id = userData?.id;
      payload.image_url = imageUrl;
      setChatData([...chatData, payload]);
    },
    [setChatData, userData, chatData, recepientId, socket],
  );

  const openSheet = () => {
    if (sheetRef?.current) {
      sheetRef?.current?.open();
    }
  };

  const setPhotoStore = async image => {
    const imageObject: ImageType = {
      name: image.filename || 'image.jpg',
      type: image.mime,
      uri: image.path || '',
    };
    const url = await handleImageUpload(imageObject);
    sendImageData(url);
  };

  useEffect(() => {
    connectWithServer();
    fetchHistoryChat();
    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <Box flex={1} justifyContent="center">
        <Spinner color="primary" size="large" />
      </Box>
    );
  }

  return (
    <Box height="100%" bg="whiteText">
      <Box>
        <NotificationNavbar />
        {chatData.length < 0 ? (
          <Box
            bg="whiteText"
            pt="xxxl"
            justifyContent="center"
            alignItems="center">
            <ImageBase source={IMAGES.CHAT_LOGO} />
            <Text
              localeId="chat.text"
              variant="titleSemibold"
              lineHeight={30}
              p="m"
            />
          </Box>
        ) : null}

        <ChatList chatData={chatData} senderId={userData?.id} />
        <ImagePickerModal onClickImage={setPhotoStore} ref={sheetRef} />
      </Box>
      {isIOS ? (
        <Box bottom={0} position="absolute" width="100%">
          <Box>
            <KeyboardAvoidingView behavior="padding">
              <ChatFooter
                onSendButtonClick={sendMessage}
                onAttachment={openSheet}
              />
            </KeyboardAvoidingView>
          </Box>
        </Box>
      ) : (
        <Box bottom={0} position="absolute" width="100%">
          <ChatFooter
            onSendButtonClick={sendMessage}
            onAttachment={openSheet}
          />
        </Box>
      )}
    </Box>
  );
};
