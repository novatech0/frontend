export class Advisor {
  constructor(
    public advisorId: number,
    public userId: number,
    public advisorName: string,
    public advisorOccupation: string,
    public advisorCity: string,
    public advisorCountry: string,
    public advisorRating: number,
    public advisorImage: string,
  ) {}
}
