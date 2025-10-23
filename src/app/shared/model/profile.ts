export class Profile {
  constructor(
    public id: number | null,
    public userId: number | null,
    public firstName: string,
    public lastName: string,
    public city: string | null,
    public country: string | null,
    public birthDate: Date | null,
    public description: string | null,
    public photo: string | null,
    public occupation: string | null | undefined,
    public experience: number | null | undefined,
  ) {}
}
