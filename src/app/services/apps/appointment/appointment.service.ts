import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/pages/apps/appointments/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/api/v1/appointments';

  constructor(private http: HttpClient) {}

  getMyAppointments(): Observable<Appointment[]> {
    // Aquí deberías obtener el farmerId y el token JWT del usuario autenticado
    const farmerId = this.getFarmerId();
    const headers = this.getAuthHeaders();
    return this.http.get<Appointment[]>(`${this.baseUrl}?farmerId=${farmerId}`, { headers });
  }

  cancelAppointment(id: number, reason: string) {
    const headers = this.getAuthHeaders();
    // Si el backend requiere el motivo, se puede enviar en el body o como query param
    // Aquí se asume que se envía en el body como parte de un update
    return this.http.put(`${this.baseUrl}/${id}`, { status: 'CANCELLED', cancelReason: reason }, { headers });
  }
  getAppointmentById(id: number): Observable<Appointment> {
    const headers = this.getAuthHeaders();
    return this.http.get<Appointment>(`${this.baseUrl}/${id}`, { headers });
  }

  // Métodos para crear, actualizar, eliminar, etc. se agregarán después

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private getFarmerId(): number {
    // Debes obtener el farmerId real del usuario autenticado
    // Esto es un placeholder, reemplázalo por la lógica real
    return Number(localStorage.getItem('farmerId')) || 1;
  }
}
