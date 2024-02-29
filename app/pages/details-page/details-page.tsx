import { Feather, Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useQuery } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Button, H4, Paragraph, ScrollView, styled, Text, useTheme, YStack } from 'tamagui';

import { useAppDispatch } from '~/app/hooks';
import { getMovieDetails } from '~/app/services/api';
import { addToFavorite, removeFromFavorite } from '~/app/store/reducer/data/data-slice';
import { useGetDataSelector } from '~/app/store/selectors';
import { MediaType, ResultItem } from '~/app/types/interfaces/apiresults.interface';
import { getImagePath, getMovieName, getMovieReleaseDate } from '~/app/utils/helpers';

export interface IDetailsPage {
  id: string;
  type: MediaType;
}

export default function DetailsPage({ id, type }: IDetailsPage): React.JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { movieList, favorites } = useGetDataSelector();

  const localMovieItem: ResultItem | undefined = movieList.find((item) => item.id === +id);

  const movieItemResult = useQuery<ResultItem>({
    queryKey: [`detail${type}`, id],
    queryFn: () => getMovieDetails(+id, type),
    enabled: !localMovieItem?.id,
  });

  const item = localMovieItem ? localMovieItem : movieItemResult?.data;
  const isFavorite = favorites.some((item) => item.id === +id);

  const toggleFavorite = () => {
    return isFavorite ? dispatch(removeFromFavorite({ item })) : dispatch(addToFavorite({ item }));
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

  const bottomTabBarHeight: number = useBottomTabBarHeight();

  const shift: number = 7;
  const translateX = useSharedValue(shift);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value * 2) }],
  }));

  useEffect(() => {
    translateX.value -= shift;
  }, []);

  return (
    <DetailsPageStyles>
      <Stack.Screen
        options={{
          title: 'Details',
          headerLeft: () => <BackButton />,
          headerRight: () => <FavoriteButton />,
        }}
      />
      <ScrollView paddingBottom={bottomTabBarHeight}>
        <ImageBackground source={getImagePath({ path: item?.backdrop_path, image: 'bg' })}>
          <Animated.Image
            borderRadius={6}
            source={getImagePath({ path: item?.poster_path, image: 'poster' })}
            style={[{ width: 200, height: 300, margin: 10 }, animatedStyles]}
          />
        </ImageBackground>

        <YStack p={10} animation="lazy" enterStyle={{ opacity: 0, y: shift * 2 }}>
          <Text fontSize={16}>
            {getMovieReleaseDate({
              releaseDate: item?.release_date,
              firstAirDate: item?.first_air_date,
            })}
          </Text>

          <H4 color="$blue11" mt="$2">
            {getMovieName(item)}
          </H4>
          {item?.vote_average ? (
            <Paragraph fontSize={12} mb="$2">
              Average number of votes: {item?.vote_average.toFixed(1)}
            </Paragraph>
          ) : (
            <Text />
          )}

          <Text fontSize={16} mt="$3" mb="$2" fontStyle="italic">
            {item?.overview}
          </Text>
        </YStack>
      </ScrollView>
    </DetailsPageStyles>
  );
}

const DetailsPageStyles = styled(YStack, {
  flex: 1,
  justifyContent: 'space-between',
  maxWidth: 960,
  bg: 'rgba(0,255,255,0.02)',
});
