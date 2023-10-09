export const paths = {
    main: '/',
    forcast: '/forcast',
    auth: '/auth',
    rewiev: '/review',
    notFound: '/*',
  } as const;
  
  export type ApplicationRoute = typeof paths;
  