import { Component, OnInit, signal } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import {Advisor} from "./advisor";
import {AdvisorService} from "src/app/services/apps/catalog/advisor.service";
import {RouterLink} from "@angular/router";

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

  constructor(
    private advisorService: AdvisorService,
  ) {}

  ngOnInit(): void {
    this.advisorService.getAdvisors().subscribe({
      next: (data) => {
        this.originalAdvisors = data;
        this.advisors.set(data);
      },
      error: (err) => console.error('Error loading advisors:', err)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchText.set(filterValue);
    this.advisors.set(
      this.originalAdvisors.filter(a => {
        const fullName = `${a.firstName} ${a.lastName}`.toLowerCase();
        return fullName.includes(filterValue);
      })
    );
  }
}
