export interface Post {
  id: number;
  title: string;
  content: string;
  categoryId: number | null;
  authorId: number | null;
  author?: { id: number; email: string } | null;
}
