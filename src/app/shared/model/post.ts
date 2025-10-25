export class Post {
  constructor(
    public postId: number | null,
    public postAdvisorId: number | null,
    public postTitle: string,
    public postDescription: string,
    public postImage: string,
  ) {}
}
