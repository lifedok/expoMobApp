import React from 'react';
import { Spinner as UiSpinner, SpinnerProps } from 'tamagui';

interface ISpinner extends SpinnerProps {}
export const Spinner = (props: ISpinner): React.ReactNode => {
  return <UiSpinner py={14} size="large" color="$blue11" {...props} />;
};
