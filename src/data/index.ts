export const API_URL = 'https://audiophile-server.adaptable.app';

export const homeData = {
  hero: {
    new: true,
    slug: 'xx99-mark-two-headphones',
    name: 'XX99 Mark II Headphones',
    description:
      'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.',
    image: {
      desktop: 'assets/home/desktop/image-hero.jpg',
      tablet: 'assets/home/tablet/image-header.jpg',
      mobile: 'assets/home/mobile/image-header.jpg',
    },
  },

  productOne: {
    slug: 'zx9-speaker',
    name: 'ZX9 SPEAKER',
    description:
      'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.',
    image: {
      desktop: 'assets/home/desktop/image-speaker-zx9.png',
      tablet: 'assets/home/tablet/image-speaker-zx9.png',
      mobile: 'assets/home/mobile/image-speaker-zx9.png',
    },
  },
  productTwo: {
    slug: 'zx7-speaker',
    name: 'ZX7 SPEAKER',
    image: {
      desktop: 'assets/home/desktop/image-speaker-zx7.jpg',
      tablet: 'assets/home/tablet/image-speaker-zx7.jpg',
      mobile: 'assets/home/mobile/image-speaker-zx7.jpg',
    },
  },
  productThree: {
    slug: 'yx1-earphones',
    name: 'YX1 EARPHONES',
    image: {
      desktop: 'assets/home/desktop/image-earphones-yx1.jpg',
      tablet: 'assets/home/tablet/image-earphones-yx1.jpg',
      mobile: 'assets/home/mobile/image-earphones-yx1.jpg',
    },
  },
} as const;
