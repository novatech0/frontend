import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-enclosure-create-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  template: `
    <h2 mat-dialog-title>Agregar recinto</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-dialog-content>
        <div class="row">
          <div class="col-12 m-b-12">
            <mat-form-field class="w-100" appearance="outline">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="name" required />
              <mat-error *ngIf="form.controls.name.invalid">Requerido</mat-error>
            </mat-form-field>
          </div>
          <div class="col-12 m-b-12">
            <mat-form-field class="w-100" appearance="outline">
              <mat-label>Capacidad</mat-label>
              <input type="number" min="0" matInput formControlName="capacity" required />
              <mat-error *ngIf="form.controls.capacity.invalid">Número válido</mat-error>
            </mat-form-field>
          </div>
          <div class="col-12 m-b-12">
            <mat-form-field class="w-100" appearance="outline">
              <mat-label>Tipo</mat-label>
              <input matInput formControlName="type" required />
              <mat-error *ngIf="form.controls.type.invalid">Requerido</mat-error>
            </mat-form-field>
          </div>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-stroked-button type="button" (click)="close()">Cancelar</button>
        <button mat-flat-button color="primary" class="text-white" type="submit" [disabled]="form.invalid">Guardar</button>
      </mat-dialog-actions>
    </form>
  `,
})
export class AppEnclosureCreateDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    capacity: new FormControl<number | null>(0, [Validators.required, Validators.min(0)]),
    type: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<AppEnclosureCreateDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    this.dialogRef.close({
      name: value.name?.trim() ?? '',
      capacity: Number(value.capacity ?? 0),
      type: value.type?.trim() ?? '',
    });
  }
}

