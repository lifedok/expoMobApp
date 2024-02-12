import { Feather, Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated';
import { Button, H1, Paragraph, ScrollView, Text, useTheme, YStack } from 'tamagui';

import { useAppDispatch } from '~/app/hooks';
import { addToFavorite, removeFromFavorite } from '~/app/store/reducer/data/data-slice';
import { useGetDataSelector } from '~/app/store/selectors';
import { ResultItem } from '~/app/types/interfaces/apiresults.interface';
import { Main } from '~/tamagui.config';

interface IDetailsPage {
  id: string;
}

export default function DetailsPage({ id }: IDetailsPage): React.JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const { id } = useLocalSearchParams<{ id: string }>();
  const { trendingMovies, favorites } = useGetDataSelector();

  const movieItem: ResultItem | undefined = trendingMovies.results.find((item) => item.id === +id);

  const isFavorite = favorites.some((item) => item.id === +id);

  const toggleFavorite = () => {
    isFavorite
      ? dispatch(removeFromFavorite({ item: movieItem }))
      : dispatch(addToFavorite({ item: movieItem }));
  };

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

  const FavoriteButton = () => (
    <Button
      unstyled
      onPress={toggleFavorite}
      scale={0.95}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.975 }}
      animation="bouncy">
      <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={26} color={theme.blue9.get()} />
    </Button>
  );

  return (
    <Main>
      <Stack.Screen
        options={{
          title: 'Details',
          headerLeft: () => <BackButton />,
          headerRight: () => <FavoriteButton />,
        }}
      />
      <ScrollView>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w400${movieItem?.backdrop_path}`,
          }}>
          <Animated.Image
            borderRadius={6}
            source={{
              uri: `https://image.tmdb.org/t/p/w400${movieItem?.poster_path}`,
            }}
            style={{ width: 200, height: 300, margin: 10 }}
          />
        </ImageBackground>

        <YStack p={10} animation="lazy" enterStyle={{ opacity: 0, y: 10 }}>
          {/*<H1 color="$blue7">{movieItem?.title || movieItem?.name}</H1>*/}

          {movieItem?.release_date ? (
            <Text fontSize={16}>Release date: {movieItem?.release_date}</Text>
          ) : (
            <Text fontSize={16}>The date of the first broadcast: {movieItem?.first_air_date}</Text>
          )}

          {movieItem?.vote_average ? (
            <Paragraph fontSize={16}>
              Average number of votes: {movieItem?.vote_average.toFixed(1)}
            </Paragraph>
          ) : (
            <Text />
          )}

          <Text fontSize={16}>{movieItem?.overview}</Text>
        </YStack>
      </ScrollView>
    </Main>
  );
}
