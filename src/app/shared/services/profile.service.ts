import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import { Profile } from 'src/app/shared/model/profile';

@Injectable({
  providedIn: 'root',
})

export class ProfileService {
  private environmentUrl = '';

  constructor(private httpClient: HttpClient) {
    this.environmentUrl = `${environment.apiUrl}/profiles`;
  }

  public fetchAdvisorProfiles(): Observable<Profile[]> {
    const urlEndpoint = `${this.environmentUrl}/advisors`;
    return this.httpClient.get<any[]>(urlEndpoint, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }).pipe(
      map((profiles: any[]) => profiles.map(profile => this.mapToProfile(profile)))
    );
  }

  public fetchProfile(userId: number): Observable<Profile> {
    const urlEndpoint = `${this.environmentUrl}/${userId}/user`;
    return this.httpClient.get(urlEndpoint, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }).pipe(map(profile => this.mapToProfile(profile)));
  }

  private mapToProfile(profile: any): Profile {
    return new Profile(
      profile['id'],
      profile['userId'],
      profile['firstName'],
      profile['lastName'],
      profile['city'],
      profile['country'],
      profile['birthDate'] ? new Date(profile['birthDate']) : null,
      profile['description'],
      profile['photo'],
      profile['occupation'],
      profile['experience']
    );
  }

  public create(profile: Profile): Observable<Profile> {
    const urlEndpoint = `${this.environmentUrl}`;
    let data = JSON.stringify({
      "userId": profile.userId,
      "firstName": profile.firstName,
      "lastName": profile.lastName,
      "city": profile.city,
      "country": profile.country,
      "birthDate": profile.birthDate,
      "description": profile.description,
      "photo": profile.photo,
      "occupation": profile.occupation,
      "experience": profile.experience
    });
    return this.httpClient.post<any>(urlEndpoint, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }).pipe(map(profile => this.mapToProfile(profile)));
  }
}
