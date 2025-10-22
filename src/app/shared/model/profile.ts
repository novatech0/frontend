export class Profile {
  constructor(
    public profileId: number | null,
    public userId: number | null,
    public profileFirstName: string,
    public profileLastName: string,
    public profileCity: string | null,
    public profileCountry: string | null,
    public profileBirthDate: Date | null,
    public profileDescription: string | null,
    public profilePhoto: string | null,
    public profileOccupation: string | null,
    public profileExperience: number | null,
  ) {}
}
