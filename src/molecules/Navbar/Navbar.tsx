import { Box, BoxProps } from 'atoms/Box';
import { Divider } from 'atoms/Divider';
import { Icon } from 'atoms/Icon';
import { Row } from 'atoms/Row';
import { Text } from 'atoms/Text';
import { Touch } from 'atoms/Touch';
import { LocaleString } from 'locales/en';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { goBack } from 'services/NavigationService';

type NavbarProps = {
  overrideBack?: () => void;
  title?: LocaleString;
  showBack?: boolean;
  backIcon?: boolean;
  containerProps?: BoxProps;
  renderRight?: React.ReactNode;
  heading?: string;
};
export const Navbar = ({
  overrideBack,
  title,
  showBack,
  containerProps,
  backIcon,
  renderRight,
  heading,
}: NavbarProps) => {
  const { top } = useSafeAreaInsets();
  const handleBack = () => {
    if (typeof overrideBack === 'function') {
      overrideBack();
    } else {
      goBack();
    }
  };
  return (
    <Box bg="whiteText" style={{ paddingTop: top }} {...containerProps}>
      <Row
        alignItems="center"
        px="m"
        pt="ml"
        pb="m"
        width="100%"
        justifyContent="center">
        {showBack ? (
          <Touch position="absolute" left={0} p="ml">
            <Icon
              size={18}
              name={backIcon ? 'back' : 'close'}
              onPress={handleBack}
            />
          </Touch>
        ) : null}
        {title && (
          <Text variant="titleSemibold" color="zBlack" localeId={title} />
        )}
        {heading && (
          <Text variant="titleSemibold" color="zBlack">
            {heading}
          </Text>
        )}
        {renderRight ? (
          <Box right={18} zIndex={999} position="absolute">
            {renderRight}
          </Box>
        ) : (
          <Box />
        )}
      </Row>
      <Divider bg="black" />
    </Box>
  );
};
