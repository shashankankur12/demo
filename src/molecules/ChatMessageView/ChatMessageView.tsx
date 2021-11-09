import React from 'react';
import { Box } from 'atoms/Box';
import { Image } from 'atoms/Image';
import { Text } from 'atoms/Text';
import { Row } from 'atoms/Row';
import { Icon } from 'atoms/Icon';
import { format } from 'date-fns';
import { ChatListType } from 'typings/chat.types';

export type ChatMessageViewProps = {
  data: ChatListType;
  self?: boolean;
};

export const ChatMessageView = ({ data, self }: ChatMessageViewProps) => {
  return (
    <Row width="100%" alignItems="flex-end" flexWrap="wrap">
      {self ? (
        <Box width="100%">
          <Box
            alignSelf="flex-end"
            p="m"
            width="70%"
            bg={data?.message ? 'primary' : 'transparent'}
            borderRadius={8}
            borderBottomRightRadius={0}>
            {data?.image_url ? (
              <Image
                source={{ uri: data?.image_url }}
                width="100%"
                height={250}
              />
            ) : (
              <>
                {data?.message ? (
                  <Text color="ultraLightBackground" textTransform="capitalize">
                    {data?.message}
                  </Text>
                ) : null}
                <Box
                  borderTopWidth={10}
                  borderLeftWidth={10}
                  borderTopColor="transparent"
                  borderColor="error"
                  position="absolute"
                  right={-10}
                  bottom={0}
                />
              </>
            )}
          </Box>
          <Row
            width="100%"
            alignItems="flex-end"
            justifyContent="flex-end"
            mt="xs">
            <Text fontSize={12} px="xs" color="chatText">
              {format(new Date(data?.createdAt), 'HH:mm')}
            </Text>
            <Icon name="tick-outline" size={12} color="#63697B" />
          </Row>
        </Box>
      ) : (
        <>
          <Box width={30} height={30} borderRadius={15} alignSelf="flex-end">
            <Image
              source={{ uri: data?.sender?.profileImage }}
              width={30}
              height={30}
              borderRadius={15}
            />
          </Box>
          <Box
            ml="m"
            p="m"
            width="70%"
            bg="aliceBlue"
            borderRadius={8}
            borderBottomLeftRadius={0}>
            {data?.image_url ? (
              <Image
                source={{ uri: data?.image_url }}
                width="100%"
                height="50%"
              />
            ) : (
              <>
                {data?.message ? (
                  <Text color="chatText">{data?.message}</Text>
                ) : null}
                <Box
                  borderTopWidth={10}
                  borderRightWidth={10}
                  borderTopColor="transparent"
                  borderColor="aliceBlue"
                  position="absolute"
                  left={-10}
                  bottom={0}
                />
              </>
            )}
          </Box>
          <Row width="100%" mt="xs" left={30}>
            <Text fontSize={12} px="s" color="chatText">
              {format(new Date(data?.createdAt), 'HH:mm')}
            </Text>
          </Row>
        </>
      )}
    </Row>
  );
};
