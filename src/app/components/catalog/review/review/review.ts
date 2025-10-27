export class Review {
  constructor(
    public reviewId: number,
    public advisorId: number,
    public farmerId: number,
    public farmerName: string,
    public farmerPhoto: string,
    public comment: string,
    public rating: number,
  ) {}
}
