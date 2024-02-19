import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import DetailsPage from '~/app/pages/details-page/details-page';
import { MediaType } from '~/app/types/interfaces/apiresults.interface';

export default function Page(): React.JSX.Element {
  const { id, type } = useLocalSearchParams<{ id: string; type: MediaType }>();

  return <DetailsPage id={id} type={type} />;
}
