import { createTheme, AllProps as RSAllProps } from '@shopify/restyle';
import { moderateScale } from 'react-native-size-matters';

/**
 * Font families available in this project --
 *  "Poppins-Black"
    "Poppins-Bold"
    "Montserrat-Regular"
    "Poppins-SemiBold"
    "Montserrat-Medium"
 */
const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  lightGreen: '#aee35f',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  zBlack: '#000000',
  white: '#FFFFFF',
  lightWhite: '#FAFBFC',
  whiteShade: '#F7F9FD',

  yellowPrimary: '#fffb2a',

  aliceBlue: '#F4F6F8',

  lighterGrey: '#eaeaea',
  lightGrey: '#bdbdbd',
  lightestGrey: '#707070',
  grey: '#939393',
  darkGrey: '#3a3a3a',
  greyishBlue: '#a1a6ba',

  blue: '#3B4D75',
  lightBlue: '#E2E8FF',
  lighterBlue: '#F0F5FF',

  red: '#cf3232',
  lightRed: '#ffcccb',

  blackText: '#141414',
  lightBlack: '#191F290F',

  transparent: 'transparent',

  xyz: 'transparent',

  green: '#90ce19',
  darkGreen: '#02af1e',
  limeGreen: '#6ff677',

  disableText: '#555b73',
  normalText: '#141414',
  sectionSeperator: '#f6f6f6',
  audioFileBg: '#f1f1f1',
  cancelBtnBg: '#a1a1a1',
  plusButton: '#fb81fd',
  greenCheck: '#3BB54A',
  greenShade: '#0DC98F',
  blumineText: '#343F76',
  warning: '#FFCC00',
  messageInputBg: '#F7F7F7',
  lightingYellow: '#F5AB31',
  darkRed: '#F8133F',
  chattext: '#63697B',
};

const theme = createTheme({
  colors: {
    primary: palette.blue,
    lightPrimary: palette.lightBlue,
    lightBlack: palette.lightBlack,
    lighterBlue: palette.lighterBlue,
    mainBackground: palette.white,
    lightBackground: palette.white,
    ultraLightBackground: palette.lightWhite,
    bluishBackground: palette.lighterGrey,
    cardPrimaryBackground: palette.purplePrimary,
    textInputBorderColor: palette.lightGrey,
    dividerBorderColor: palette.lightestGrey,
    textInputBackground: palette.white,
    aliceBlue: palette.aliceBlue,
    error: palette.red,
    darkRed: palette.darkRed,
    transparent: palette.transparent,
    xyz: palette.xyz,
    whiteShade: palette.whiteShade,
    greyText: palette.grey,
    whiteText: palette.white,
    darkText: palette.blackText,
    darkGreyText: palette.darkGrey,
    chipBackground: palette.lighterGrey,
    success: palette.green,
    greenShade: palette.greenShade,
    successStep: palette.limeGreen,
    currentStep: palette.yellowPrimary,
    inactiveTab: palette.lightGrey,
    disableText: palette.disableText,
    normalText: palette.normalText,
    sectionSeperator: palette.sectionSeperator,
    audioFileBg: palette.audioFileBg,
    black: palette.black,
    cancelBtnBg: palette.cancelBtnBg,
    plusButton: palette.plusButton,
    greenCheck: palette.greenCheck,
    currency: palette.darkGreen,
    zBlack: palette.zBlack,
    disabled: palette.greyishBlue,
    blumineText: palette.blumineText,
    warning: palette.warning,
    messageInputBg: palette.messageInputBg,
    lightingYellow: palette.lightingYellow,
    greenPrimary: palette.greenPrimary,
    lightGreen: palette.lightGreen,
    lightRed: palette.lightRed,
    chatText: palette.chattext,
  },
  spacing: {
    '-xs': -4,
    '-s': -8,
    '-sl': -10,
    '-xm': -12,
    '-m': -16,
    '-ml': -18,
    '-l': -24,
    '-xl': -30,
    '-xxl': -40,
    '-xxxl': -50,
    '-mxxxl': -55,
    z: 0,
    xxs: 2,
    xs: 4,
    s: 8,
    sl: 10,
    xm: 12,
    m: 16,
    ml: 18,
    mll: 20,
    l: 24,
    xl: 30,
    xxl: 40,
    xxxl: 50,
    XL: 60,
    XXL: 80,
    XXXL: 100,
    phoneInputPadding: 100,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textInputVariants: {
    error: {
      borderColor: 'error',
    },
    phone: {
      paddingLeft: 'phoneInputPadding',
    },
    phoneError: {
      borderColor: 'error',
      paddingLeft: 'phoneInputPadding',
    },
    socialError: {
      borderColor: 'error',
      paddingLeft: 'XL',
    },
    social: {
      paddingLeft: 'XL',
    },
  },
  textVariants: {
    headline: {
      fontSize: moderateScale(18),
      fontFamily: 'Montserrat-Bold',
    },
    headlineBold: {
      fontSize: moderateScale(18),
      fontFamily: 'Montserrat-Bold',
    },
    headlineSemibold: {
      fontSize: moderateScale(18),
      fontFamily: 'Montserrat-SemiBold',
    },
    headlineRegular: {
      fontSize: moderateScale(18),
      fontFamily: 'Montserrat-Regular',
    },
    headlineMedium: {
      fontSize: moderateScale(18),
      fontFamily: 'Montserrat-Medium',
    },
    title: {
      fontSize: moderateScale(16),
      fontFamily: 'Montserrat-Medium',
    },
    titleRegular: {
      fontSize: moderateScale(16),
      fontFamily: 'Montserrat-Regular',
    },
    titleSemibold: {
      fontSize: moderateScale(16),
      fontFamily: 'Montserrat-SemiBold',
    },
    titleMedium: {
      fontSize: moderateScale(16),
      fontFamily: 'Montserrat-Medium',
    },
    textMedium: {
      fontSize: moderateScale(14),
      fontFamily: 'Montserrat-Medium',
    },
    textRegular: {
      fontSize: moderateScale(14),
      fontFamily: 'Montserrat-Regular',
    },

    boldTitle: {
      fontSize: moderateScale(16),
      fontFamily: 'Montserrat-Bold',
    },
    subTitle: {
      fontSize: moderateScale(14),
      fontFamily: 'Montserrat-Bold',
      fontWeight: 'bold',
    },
    titleDescription: {
      fontSize: moderateScale(14),
      fontFamily: 'Montserrat-Medium',
    },
    body: {
      fontSize: moderateScale(14),
      fontFamily: 'Montserrat-Regular',
    },
    bodyRegular: {
      fontSize: moderateScale(14),
      fontFamily: 'Montserrat-Regular',
    },
    bodyMedium: {
      fontSize: moderateScale(14),
      fontFamily: 'Montserrat-Medium',
    },
    bodySmall: {
      fontSize: moderateScale(12),
      fontFamily: 'Montserrat-Medium',
    },
    largeBody: {
      fontSize: moderateScale(50),
      fontFamily: 'Montserrat-Regular',
    },
    regular: {
      fontFamily: 'Montserrat-Regular',
    },
    bold: {
      fontFamily: 'Montserrat-Bold',
    },
    semiBold: {
      fontFamily: 'Montserrat-SemiBold',
    },
    medium: {
      fontFamily: 'Montserrat-Medium',
    },
  },
  buttonVariants: {
    secondary: {
      width: '100%',
      height: 50,
      paddingHorizontal: 's',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      borderColor: 'primary',
      borderWidth: 1,
      backgroundColor: 'lighterBlue',
    },
    'secondary-small': {
      width: '100%',
      height: 30,
      paddingHorizontal: 's',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      borderColor: 'primary',
      borderWidth: 2,
    },
    primary: {
      width: '100%',
      height: 50,
      paddingHorizontal: 's',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      borderColor: 'primary',
      borderWidth: 2,
    },
    'primary-round': {
      width: '100%',
      height: 50,
      paddingHorizontal: 's',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 27,
      borderColor: 'primary',
      borderWidth: 2,
    },
  },
  buttonTextVariants: {
    primary: {
      color: 'whiteText',
    },
    'primary-round': {
      color: 'whiteText',
    },
    secondary: {
      color: 'primary',
    },
    'secondary-small': {
      fontSize: 12,
      color: 'primary',
    },
  },
  selectBoxVariants: {
    selected: {
      borderColor: 'primary',
      backgroundColor: 'lightPrimary',
    },
    nonSelected: {
      borderColor: 'textInputBorderColor',
    },
    error: {
      borderColor: 'error',
    },
  },
  cardVariants: {
    low: {
      overflow: 'visible',
      shadowColor: 'zBlack',
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      shadowOffset: { width: 0, height: 1 },
      elevation: 3,
    },
    medium: {
      overflow: 'visible',
      shadowColor: 'zBlack',
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
    high: {
      overflow: 'visible',
      shadowColor: 'zBlack',
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      shadowOffset: { width: 0, height: 3 },
      elevation: 7,
    },
  },
});
export type Theme = typeof theme;
export type AllProps = RSAllProps<Theme>;
export default theme;
