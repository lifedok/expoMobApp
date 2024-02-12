import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import DetailsPage from '~/app/pages/details-page/details-page';

export default function Page(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <DetailsPage id={id} />;
}
