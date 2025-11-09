import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Profile } from 'src/app/shared/model/profile';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class AppProfileComponent implements OnInit {
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  profile = signal<Profile | null>(null);

  editing = signal<boolean>(false);
  form: FormGroup;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private fb: FormBuilder,
    private alert: SweetAlertService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: [''],
      country: [''],
      birthDate: [''],
      description: [''],
      occupation: [''],
      experience: [0]
    });
  }

  ngOnInit(): void {
    const userId = this.authService.user.id;
    if (userId == null) {
      this.loading.set(false);
      this.error.set('No se encontró el usuario');
      return;
    }
    this.loadProfile(userId);
  }

  private loadProfile(userId: number) {
    this.loading.set(true);
    this.profileService.fetchProfile(userId).subscribe({
      next: (p) => {
        this.profile.set(p);
        this.patchForm(p);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
        this.error.set('No se pudo cargar el perfil');
        this.loading.set(false);
      }
    })
  }

  private patchForm(p: Profile) {
    this.form.patchValue({
      firstName: p.firstName,
      lastName: p.lastName,
      city: p.city,
      country: p.country,
      birthDate: p.birthDate ? p.birthDate.toISOString().slice(0,10) : '',
      description: p.description,
      occupation: p.occupation,
      experience: p.experience
    });
  }

  onEdit(): void {
    this.editing.set(true);
  }

  onCancel(): void {
    // restaurar valores del perfil
    const p = this.profile();
    if (p) this.patchForm(p);
    this.editing.set(false);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const p = this.profile();
    if (!p) return;

    const payload = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      city: this.form.value.city,
      country: this.form.value.country,
      birthDate: this.form.value.birthDate,
      description: this.form.value.description,
      photo: p.photo ?? null,
      occupation: this.form.value.occupation ?? null,
      experience: Number(this.form.value.experience) ?? 0
    };

    this.profileService.updateProfile(p.id, payload).subscribe({
      next: (updated) => {
        this.profile.set(updated);
        this.patchForm(updated);
        this.editing.set(false);
        this.alert.saved('Perfil actualizado correctamente');
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
        this.alert.hasServerError('No se pudo actualizar el perfil');
      }
    })
  }

  onDelete(): void { /* pendiente */ }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/profile/user-1.jpg';
  }
}
