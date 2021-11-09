import { Box, BoxProps } from 'atoms/Box';
import { Divider } from 'atoms/Divider';
import { Icon } from 'atoms/Icon';
import { Row } from 'atoms/Row';
import { Text } from 'atoms/Text';
import { Touch } from 'atoms/Touch';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const NotificationNavbar = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Box bg="whiteText" style={{ paddingTop: top }}>
      <Box px="m" pb="m" bg="lightBackground" p="m" pt="ml">
        <Row alignItems="center" width="100%" justifyContent="flex-start">
          <Text localeId="profile.setting.title" variant="headlineSemibold" />
          <Box position="absolute" right={0}>
            <Touch>
              <Icon size={20} name="bell" color="grey" />
              <Box
                bg="darkRed"
                width={17}
                height={17}
                position="absolute"
                borderRadius={8.5}
                left={8}
                bottom={10}
                alignItems="center">
                <Text color="whiteText" variant="bodySmall">
                  2
                </Text>
              </Box>
            </Touch>
          </Box>
        </Row>
      </Box>
      <Divider bg="black" />
    </Box>
  );
};
