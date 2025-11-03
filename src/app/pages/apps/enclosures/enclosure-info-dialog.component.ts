import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface EnclosureInfoData {
  name: string;
  capacity: number;
  type: string;
}

@Component({
  selector: 'app-enclosure-info-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <h2 mat-dialog-title>Detalle del recinto</h2>
    <mat-dialog-content>
      <div class="row">
        <div class="col-12 m-b-8"><strong>Nombre:</strong> {{ data.name }}</div>
        <div class="col-12 m-b-8"><strong>Capacidad:</strong> {{ data.capacity }}</div>
        <div class="col-12 m-b-8"><strong>Tipo:</strong> {{ data.type }}</div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-flat-button color="primary" class="text-white" (click)="close()">Cerrar</button>
    </mat-dialog-actions>
  `,
})
export class AppEnclosureInfoDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AppEnclosureInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EnclosureInfoData,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}

