import { Feather } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Button, Text, YStack } from 'tamagui';

import { Container, Main, Subtitle, Title } from '~/tamagui.config';

export default function Page() {
  const { id } = useLocalSearchParams<any>(); // TODO
  const router = useRouter();

  const BackButton = () => (
    <Button
      unstyled
      flexDirection="row"
      backgroundColor="transparent"
      paddingLeft={0}
      pressStyle={{ opacity: 0.5 }}
      onPress={router.back}
      icon={<Feather name="chevron-left" size={16} color="#007AFF" />}>
      <Text color="#007AFF">Back</Text>
    </Button>
  );

  return (
    <Container>
      <Stack.Screen options={{ title: 'List item', headerLeft: () => <BackButton /> }} />
      <Main>
        <YStack>
          <Title>List item</Title>
          <Subtitle>List item details for user {id}.</Subtitle>
        </YStack>
      </Main>
    </Container>
  );
}
