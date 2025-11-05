import {Component, OnInit, signal} from '@angular/core';
import {AvailableDateService} from "../../../../services/apps/appointment/available-date.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {AdvisorService} from "../../../../services/apps/catalog/advisor.service";
import {AvailableDate} from "../../../../shared/model/available-date";
import {TablerIconsModule} from "angular-tabler-icons";
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-available-dates',
  imports: [
    MaterialModule,
    TablerIconsModule,
    RouterLink
  ],
  templateUrl: './available-dates.component.html',
  styleUrl: './available-dates.component.scss'
})
export class AvailableDatesComponent implements OnInit {
  availableDates = signal<AvailableDate[]>([]);

  constructor(
    private availableDateService: AvailableDateService,
    private authService: AuthService,
    private advisorService: AdvisorService,
    private router: Router
  ) {

  }

  ngOnInit() {
    var userId = this.authService.user.id || 0;
    this.advisorService.getAdvisorByUserId(userId).subscribe({
      next: (advisor) => {
        this.availableDateService.findByAdvisorId(advisor.id).subscribe({
          next: (data) => {
            this.availableDates.set(data);
          }
        })
      },
      error: (err) => {
        console.error('Error fetching advisor by user ID:', err);}
    })
  }

}
