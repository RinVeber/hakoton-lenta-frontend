export const paths = {
    main: '/hakoton-lenta-frontend',
    forcast: '/forcast',
    auth: '/auth',
    rewiev: '/review',
    notFound: '/*',
  } as const;
  
  export type ApplicationRoute = typeof paths;
  