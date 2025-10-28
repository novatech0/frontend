import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {AvailableDate} from "../../../pages/apps/catalog/book-appointment/available-date";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AvailableDateService {
  private environmentUrl = '';

  constructor(private httpClient: HttpClient) {
    this.environmentUrl = `${environment.apiUrl}/available_dates`;
  }

  public getAvailableDatesByAdvisor(advisorId: number): Observable<AvailableDate[]> {
    return this.httpClient.get<AvailableDate[]>(`${this.environmentUrl}?advisorId=${advisorId}&isAvailable=true`)
      .pipe(map(dtos => dtos.map(dto => AvailableDate.fromDto(dto))));
  }
}
