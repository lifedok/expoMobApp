export const ERoute = {
  MAIN: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer',
  LOCATION: '/location',
};

export enum ApiRoute {
  LOGIN = '/login',
  LOGOUT = '/logout',
  HOTELS = '/hotels',
  FAVORITES = '/favorite',
  COMMENTS = '/comments',
}

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}
