import { Component, OnInit, signal } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Advisor } from "./advisor";
import { AdvisorService } from "src/app/services/apps/catalog/advisor.service";
import { RouterLink } from "@angular/router";
import { AvailableDateService } from "../../../../services/apps/catalog/available-date.service";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  templateUrl: './catalog.component.html',
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
    CommonModule,
    RouterLink,
  ],
})
export class AppCatalogComponent implements OnInit {
  private originalAdvisors: Advisor[] = [];
  advisors = signal<Advisor[]>([]);
  searchText = signal<string>('');
  selectedDate: Date | null = null;

  constructor(
    private advisorService: AdvisorService,
    private availableDatesService: AvailableDateService
  ) {}

  ngOnInit(): void {
    this.loadAdvisors();
  }

  private loadAdvisors(): void {
    this.advisorService.getAdvisors().subscribe({
      next: (data) => {
        this.originalAdvisors = data;
        this.advisors.set(data);
      },
      error: (err) => console.error('Error loading advisors:', err),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchText.set(filterValue);
    this.filterAdvisors();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value;
    this.filterAdvisors();
  }

  private filterAdvisors(): void {
    const text = this.searchText().toLowerCase();

    let filtered = this.originalAdvisors.filter(a => {
      const fullName = `${a.firstName} ${a.lastName}`.toLowerCase();
      return fullName.includes(text);
    });

    if (this.selectedDate) {
      const dateStr = this.selectedDate!.toISOString().split('T')[0];
      this.availableDatesService.getAvailableDatesByDate(dateStr).subscribe({
        next: (slots) => {
          const availableAdvisorIds = new Set(slots.map(s => s.advisorId));
          this.advisors.set(filtered.filter(a => availableAdvisorIds.has(a.advisorId)));
        },
        error: err => console.error(err)
      });
    }
    else {
      this.advisors.set(filtered);
    }
  }
}
