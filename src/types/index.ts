type ImageType = {
  mobile: string;
  tablet: string;
  desktop: string;
};
export interface ProductInterface {
  id: number;
  slug: string;
  name: string;
  image: ImageType;
  category: string;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  gallery: {
    first: ImageType;
    second: ImageType;
    third: ImageType;
  };
  others: {
    slug: string;
    name: string;
    image: { mobile: string; tablet: string; desktop: string };
  }[];
}

export interface CategoryProductInterface {
  slug: string;
  image: ImageType;
  name: string;
  description: string;
  new: boolean;
}

export interface CartProductInterface {
  slug: string;
  name: string;
  price: number;
  image: string;
}
