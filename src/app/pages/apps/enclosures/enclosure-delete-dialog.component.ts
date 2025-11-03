import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-enclosure-delete-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <h2 mat-dialog-title>Eliminar recinto</h2>
    <mat-dialog-content>
      <p>¿Seguro que deseas eliminar el recinto <strong>{{ data?.name || ('#' + data?.id) }}</strong>?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="close(false)">Cancelar</button>
      <button mat-flat-button color="warn" class="text-white" (click)="close(true)">Eliminar</button>
    </mat-dialog-actions>
  `,
})
export class AppEnclosureDeleteDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AppEnclosureDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name?: string }
  ) {}

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}

