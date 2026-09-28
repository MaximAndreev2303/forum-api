export interface CreatePostDto {
  title: string;
  content: string;
  author: string;
  category: string;
}

export interface PostDto {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
}