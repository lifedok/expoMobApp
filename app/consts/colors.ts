import { colorTokens } from '@tamagui/themes';

const lightPalette = colorTokens.light;
export default {
  bgPrimary: 'rgba(0,255,255,0.02)',
  bgSecondary: lightPalette.blue.blue11,

  textColorPrimary: lightPalette.green.green10,
  textColorSecondary: lightPalette.blue.blue6,
  textColorOptional: '#a9a9a9',
  textColorIcon: lightPalette.blue.blue9,

  textColorError: lightPalette.red.red9,
  textColorWarning: lightPalette.yellow.yellow8,
  textColorSuccess: lightPalette.green.green8,

  shadowColor: '#000',

  /*
   *   components  *
   */

  // link
  linkTextColor: lightPalette.blue.blue12,

  // input
  inputBorderColor: lightPalette.green.green8,
  inputTextColor: lightPalette.green.green12,

  // button
  buttonBgColor: lightPalette.green.green5,
  buttonBgColorOptional: lightPalette.green.green7,
  buttonTextColor: lightPalette.green.green12,

  // drawer
  driverBgColor: lightPalette.green.green2,
  driverActiveBgColor: lightPalette.blue.blue11,
  driverActiveTextColor: lightPalette.blue.blue1,
  driverIconColor: lightPalette.green.green9,
  driverBorderColor: lightPalette.green.green5,
};
