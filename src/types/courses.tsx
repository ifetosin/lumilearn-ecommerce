export type Course = {
  slug: string;
  title: string;
  type: string;
  cover_image_url: string;
  price: number;
  rating: number;
  tutor: {
    id: string;
    avatar: string;
    name: string;
  };
  duration_type: string;
  duration: number;
};
