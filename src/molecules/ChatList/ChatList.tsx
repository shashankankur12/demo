import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { ChatMessageView } from 'molecules/ChatMessageView';
import { Box } from 'atoms/Box';
import { ChatListType } from 'typings/chat.types';
import { deviceHeight, isIOS } from 'utils/device';

export const ChatList = ({ chatData, senderId }) => {
  const renderItem = ({ item }: ListRenderItemInfo<ChatListType>) => {
    return <ChatMessageView data={item} self={item.sender_id === senderId} />;
  };

  return (
    <Box p="s" bg="whiteText" height={isIOS ? '80%' : deviceHeight - 250}>
      <FlatList
        data={chatData.slice().reverse()}
        inverted
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};
