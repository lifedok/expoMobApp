enum ERouteUnit {
  AUTH = '/screens/(auth)',
  TABS = '/screens/(drawer)/(tabs)',
}

export enum ERoutePaths {
  LOGIN = `${ERouteUnit.AUTH}/login`,
  REGISTER = `${ERouteUnit.AUTH}/register`,
  FORGOT = `${ERouteUnit.AUTH}/forgot`,

  HOME = `${ERouteUnit.TABS}/home`,
  MOVIES = `${ERouteUnit.TABS}/home/movies`,
}
