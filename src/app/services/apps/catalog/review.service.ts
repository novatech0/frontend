import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, switchMap} from "rxjs/operators";
import {ProfileService} from "src/app/shared/services/profile.service";
import {forkJoin, Observable} from "rxjs";
import {Profile} from "src/app/shared/model/profile";
import {Review} from "../../../components/catalog/review/review/review";
import {FarmerService} from "./farmer.service";

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private environmentUrl = '';

  constructor(private httpClient: HttpClient,
              private profileService: ProfileService,
              private farmerService: FarmerService,) {
    this.environmentUrl = `${environment.apiUrl}/reviews`;
  }

  public getReviewsByAdvisorId(advisorId: number): Observable<Review[]> {
    return this.httpClient
      .get<any[]>(`${this.environmentUrl}?advisorId=${advisorId}`)
      .pipe(
        switchMap(reviews => {
          if (!reviews.length) return [ [] ];

          const farmerRequests = reviews.map(r =>
            this.farmerService.getFarmer(r.farmerId)
          );

          return forkJoin(farmerRequests).pipe(
            switchMap(farmers => {
              const profileRequests = farmers.map(f =>
                this.profileService.fetchProfile(f.userId)
              );
              return forkJoin(profileRequests).pipe(
                map(profiles =>
                  reviews.map((r, i) => {
                    const profile = profiles[i];
                    return new Review(
                      r.reviewId,
                      r.advisorId,
                      r.farmerId,
                      `${profile.firstName} ${profile.lastName}`,
                      profile.photo,
                      r.comment,
                      r.rating
                    );
                  })
                )
              );
            })
          );
        })
      );
  }

}
