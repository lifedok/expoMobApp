import React from 'react';
import { Spinner as UiSpinner, SpinnerProps } from 'tamagui';

import colors from '~/app/consts/colors';

interface ISpinner extends SpinnerProps {}
export const Spinner = (props: ISpinner): React.ReactNode => {
  return <UiSpinner py={14} size="large" color={colors.bgSecondary} {...props} />;
};
