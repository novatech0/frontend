import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import {AdvisorService} from "src/app/services/apps/catalog/advisor.service";
import {Advisor} from "../advisor";
import moment from "moment";
import {ReviewComponent} from "../../../../components/catalog/review/review/review.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-advisor-page',
  imports: [MaterialModule, TablerIconsModule, ReviewComponent, NgIf, RouterLink],
  templateUrl: './advisor-detail.component.html'
})
export class AppAdvisorDetailComponent implements OnInit {
  advisor: Advisor;
  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public advisorService: AdvisorService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const advisorId = params['advisorId'];
      if (advisorId) {
        this.loadAdvisor(advisorId);
      }
    });
  }

  private loadAdvisor(advisorId: number): void {
    this.advisorService.getAdvisor(advisorId).subscribe({
      next: (data) => {
        this.advisor = data;
      },
      error: (err) => {
        console.error('Error loading advisor:', err);
      }
    });
  }

  protected calculateAge(birthDate: Date): number {
    return moment().diff(birthDate, 'years');
  }
}
