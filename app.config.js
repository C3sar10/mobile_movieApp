import 'expo-env';

export default {
  expo: {
    name: 'CinaMax', // <-- from app.json
    slug: 'myFirstMobileApp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/movie_logo_nbg.png',
    scheme: 'movies',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/movie_logo_nbg.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/images/movie_logo_nbg.png',
    },
    splash: {
      image: './assets/images/movie_logo_nbg.png',
      resizeMode: 'contain',
      backgroundColor: '#000000',
    },
    extra: {
      EXPO_PUBLIC_MOVIE_API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    },
  },
};
