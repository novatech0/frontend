import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Appointment} from "src/app/shared/model/appointment";

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private environmentUrl = '';

  constructor(private httpClient: HttpClient) {
    this.environmentUrl = `${environment.apiUrl}/appointments`;
  }

  public bookAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(`${this.environmentUrl}`, appointment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }).pipe(map(dto => Appointment.fromDto(dto)));
  }
}
