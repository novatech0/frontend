import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import {Advisor} from "src/app/pages/apps/catalog/advisor";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, switchMap} from "rxjs/operators";
import {ProfileService} from "src/app/shared/services/profile.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AdvisorService {
  private environmentUrl = '';

  constructor(private httpClient: HttpClient,
              private profileService: ProfileService,) {
    this.environmentUrl = `${environment.apiUrl}/advisors`;
  }

  public getAdvisors(): Observable<Advisor[]> {
    return this.httpClient.get<any[]>(this.environmentUrl).pipe(
      switchMap((advisors) =>
        this.profileService.fetchAdvisorProfiles().pipe(
          map((profiles) =>
            advisors.map((advisor) => {
              const profile = profiles.find(p => p.userId === advisor.userId);
              return new Advisor(
                advisor.id,
                advisor.userId,
                `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`.trim(),
                profile?.occupation ?? '',
                profile?.city ?? '',
                profile?.country ?? '',
                advisor.rating,
                profile?.photo ?? '',
              )
            })
          )
        )
      )
    )
  }
}
