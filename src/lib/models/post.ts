export type Post = {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  tags: string[];
  dislikes: number;
  datePosted: Date;
};
