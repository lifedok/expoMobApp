import { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Text, styled, YStack, Input } from 'tamagui';

export const MovieHeader = () => {
  const [searchString, setSearchString] = useState('');

  return (
    <ImageBackground
      source={{
        uri: 'https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/ghQrKrcEpAlkzBuNoOCSxHQXWqw.jpg',
      }}
      style={{ width: '100%', height: 200 }}>
      <Container>
        <YStack>
          <Title
            color="#fff"
            enterStyle={{
              opacity: 0,
              scale: 1.5,
              y: -10,
            }}
            animation="quick">
            Trending
          </Title>
          <Input
            placeholder="Search for a movie, tv show, person...."
            placeholderTextColor="#fff"
            borderWidth={1}
            size="$4"
            value={searchString}
            onChangeText={(text) => setSearchString(text)}
          />
        </YStack>
      </Container>
    </ImageBackground>
  );
};

export const Container = styled(YStack, {
  padding: 24,
  maxWidth: 960,
});

export const Main = styled(YStack, {
  flex: 1,
  // maxWidth: 960,
  justifyContent: 'space-between',
});

export const Title = styled(Text, {
  fontSize: 64,
  fontWeight: 'bold',
});

export const Subtitle = styled(Text, {
  color: '#38434D',
  fontSize: 36,
});
