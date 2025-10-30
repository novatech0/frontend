// @ts-nocheck
export interface Appointment {
  id: number;
  farmerId: number;
  availableDateId: number;
  message: string;
  status: 'PENDING' | 'ONGOING' | 'COMPLETED';
  meetingUrl: string;
  advisorName?: string;
  advisorPhoto?: string;
  scheduledDate?: string;
  startTime?: string;
  endTime?: string;
}
