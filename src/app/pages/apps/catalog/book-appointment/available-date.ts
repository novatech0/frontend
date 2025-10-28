export class AvailableDate {
  constructor(
    public dateId: number,
    public advisorId: number,
    public scheduledDate: Date,
    public startTime: string,
    public endTime: string,
    public status: boolean,
  ) {}

  static fromDto(dto: any): AvailableDate {
    const dateId = dto.id ?? 0;
    const advisorId = dto.advisorId ?? 0;
    const scheduledDate = dto.scheduledDate ? new Date(dto.scheduledDate) : new Date(NaN);
    const startTime = dto.startTime ?? '';
    const endTime = dto.endTime ?? '';
    const statusRaw = dto.status ?? dto.isAvailable ?? '';
    const status = String(statusRaw).toUpperCase() === 'AVAILABLE' || statusRaw === true;
    return new AvailableDate(dateId, advisorId, scheduledDate, startTime, endTime, status);
  }

  toDto(): any {
    return {
      id: this.dateId,
      advisorId: this.advisorId,
      scheduledDate: this.scheduledDate.toISOString().split('T')[0],
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status ? 'AVAILABLE' : 'UNAVAILABLE',
    };
  }
}
