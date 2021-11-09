import React from 'react';
import { Box } from 'atoms/Box';
import { Text } from 'atoms/Text';
import { Icon } from 'atoms/Icon';
import { Touch } from 'atoms/Touch';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePickerCropper from 'react-native-image-crop-picker';
import { translate } from 'utils/locale';
import { PressEvent } from 'typings/events';

type ImagePickerModalProps = {
  onClickImage: PressEvent;
};

export const ImagePickerModal = React.forwardRef(
  ({ onClickImage }: ImagePickerModalProps, ref) => {
    const options = [
      {
        name: translate('take.from.camera.text' || ''),
        icon: <Icon size={20} color="grey" name="camera" />,
        onPress: () => {
          ImagePickerCropper.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            freeStyleCropEnabled: true,
          })
            .then(images => {
              onClickImage(images);
            })
            .catch(error => {});
        },
      },
      {
        name: translate('take.from.gallery' || ''),
        icon: <Icon size={20} color="grey" name="folder-upload" />,
        onPress: () => {
          ImagePickerCropper.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            freeStyleCropEnabled: true,
          })

            .then(images => {
              onClickImage(images);
            })
            .catch(error => {});
        },
      },
    ];
    return (
      <RBSheet
        ref={ref}
        height={190}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}>
        <Box>
          <Text variant="titleSemibold" px="xxl" localeId="Add.Photo.text" />
          {options.map(({ name, onPress, icon }) => (
            <Touch
              onPress={onPress}
              key={name}
              flexDirection="row"
              px="s"
              pt="m">
              {icon}
              <Text variant="textRegular" px="s">
                {name}
              </Text>
            </Touch>
          ))}
        </Box>
      </RBSheet>
    );
  },
);
