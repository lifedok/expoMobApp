import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ISplashAnimation {
  onAnimationFinish?: (value: boolean) => void;
}
export default function SplashAnimation({ onAnimationFinish }: ISplashAnimation) {
  return (
    <View style={SplashAnimationStyles.wrapper}>
      <Text style={SplashAnimationStyles.header}>Welcome to</Text>
      <Text style={SplashAnimationStyles.text}>The Movie DB</Text>
      <LottieView
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
    backgroundColor: 'rgba(0,255,255,0.02)',
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
    color: 'rgb(48, 164, 108)',
    paddingBottom: 32,
    letterSpacing: 2,
  },
});
