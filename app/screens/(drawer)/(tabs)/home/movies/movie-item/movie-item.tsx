import { Link } from 'expo-router';
import { XStack, Image, Card, CardProps, H2, Paragraph, Button } from 'tamagui';

import { ResultItem } from '~/app/types/interfaces/apiresults.interface';
import { EPathRouteScreen } from "~/app/types/enums/route.enum";

interface IMovieItem extends CardProps {
  item: ResultItem;
}
export const MovieItem = (props: IMovieItem) => {
  const { item, ...cardProp } = props;
  return (
    <Link
      href={{ pathname: EPathRouteScreen.DETAILS, params: { name: item.title || item.name } } as never}
      asChild>
      <Card elevate bordered {...cardProp}>
        <Card.Header padded>
          <H2>{item.title || item.name}</H2>
          <Paragraph theme="alt2">Now available</Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={1} />
          <Button borderRadius="$10">Purchase</Button>
        </Card.Footer>
        <Card.Background>
          <Image
            resizeMode="contain"
            alignSelf="center"
            source={{
              width: 300,
              height: 300,
              uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
            }}
          />
        </Card.Background>
      </Card>
    </Link>
  );
};
