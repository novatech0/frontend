import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Enclosure } from 'src/app/shared/model/enclosure';

@Injectable({ providedIn: 'root' })
export class EnclosureService {
  private environmentUrl = `${environment.apiUrl}/enclosures`;

  constructor(private http: HttpClient) {}

  public getEnclosuresByFarmer(farmerId: number): Observable<Enclosure[]> {
    const url = `${this.environmentUrl}?farmerId=${farmerId}`;
    return this.http.get<Enclosure[]>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    });
  }
}

