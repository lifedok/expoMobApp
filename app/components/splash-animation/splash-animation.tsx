import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { ZoomOut } from 'react-native-reanimated';

import colors from '~/app/consts/colors';

interface ISplashAnimation {
  onAnimationFinish?: (value: boolean) => void;
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
export default function SplashAnimation({ onAnimationFinish }: ISplashAnimation) {
  return (
    <View style={SplashAnimationStyles.wrapper}>
      <Text style={SplashAnimationStyles.header}>Welcome to</Text>
      <Text style={SplashAnimationStyles.text}>The Movie DB</Text>
      <AnimatedLottieView
        exiting={ZoomOut}
        autoPlay
        loop={false}
        style={{
          width: '70%',
          maxWidth: 400,
        }}
        onAnimationFinish={onAnimationFinish}
        source={require('@assets/lottie/movie.json')}
      />
    </View>
  );
}

const SplashAnimationStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgPrimary,
  },
  header: {
    fontSize: 28,
    fontWeight: '500',
    paddingBottom: 12,
    alignItems: 'center',
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: colors.textColorPrimary,
    paddingBottom: 32,
    letterSpacing: 2,
  },
});
