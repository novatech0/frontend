import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppointmentDetailed } from 'src/app/pages/apps/farmer/appointment/appointment-detailed';
import {environment} from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private baseUrl = environment.apiUrl + '/appointments';

  constructor(private http: HttpClient) {}

  getMyAppointments(): Observable<AppointmentDetailed[]> {
    // Aquí deberías obtener el farmerId y el token JWT del usuario autenticado
    const farmerId = this.getFarmerId();
    const headers = this.getAuthHeaders();
    return this.http.get<AppointmentDetailed[]>(`${this.baseUrl}?farmerId=${farmerId}`, { headers });
  }

  getMyAdvisorAppointments(): Observable<AppointmentDetailed[]> {
    // Obtener citas del asesor autenticado usando advisorId del localStorage
    const advisorId = this.getAdvisorId();
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}?advisorId=${advisorId}`;

    return this.http.get<AppointmentDetailed[]>(url, { headers });
  }

  getAllAppointments(): Observable<AppointmentDetailed[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<AppointmentDetailed[]>(`${this.baseUrl}`, { headers });
  }

  getAdvisorAppointments(advisorId: number): Observable<AppointmentDetailed[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<AppointmentDetailed[]>(`${this.baseUrl}?advisorId=${advisorId}`, { headers });
  }

  cancelAppointment(id: number, reason: string): Observable<any> {
    const headers = this.getAuthHeaders();
    // El backend devuelve texto plano, no JSON
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers,
      responseType: 'text'
    });
  }
  getAppointmentById(id: number): Observable<AppointmentDetailed> {
    const headers = this.getAuthHeaders();
    return this.http.get<AppointmentDetailed>(`${this.baseUrl}/${id}`, { headers });
  }

  bookAppointment(appointment: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.baseUrl, appointment, { headers });
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

  private getAdvisorId(): number {
    // Obtener el advisorId del usuario autenticado
    return Number(localStorage.getItem('advisorId')) || 0;
  }
}
