import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import {NgIf} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import {Crop} from "../crop";
import {CropService} from "../../../../../services/apps/crops/crop.service";

@Component({
  selector: 'app-crop-detail-page',
  imports: [MaterialModule, TablerIconsModule, NgIf],
  templateUrl: './crop-detail.component.html'
})
export class AppCropDetailComponent implements OnInit {
  crop: Crop;
  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public cropService: CropService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const cropId = params['cropId'];
      if (cropId) {
        this.loadCrop(cropId);
      }
    });
  }

  private loadCrop(cropId: number): void {
    this.cropService.getCropById(cropId).subscribe({
      next: (data) => {
        this.crop = data;
      },
      error: (err) => {
        console.error('Error cargando Crop:', err);
      }
    });
  }

  getHumidityStroke(value: number): string {
    // Asegura que el valor esté entre 0 y 100
    const percentage = Math.max(0, Math.min(100, value));
    // Devuelve 'progreso, resto' (resto = 100 - progreso)
    return `${percentage}, ${100 - percentage}`;
  }
}
