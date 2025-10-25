export class Post {
  constructor(
    public postId: number | null,
    public advisorId: number | null,
    public postTitle: string,
    public postDescription: string,
    public postImage: string,
  ) {}
}
