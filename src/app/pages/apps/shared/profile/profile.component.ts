import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Profile } from 'src/app/shared/model/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule],
  templateUrl: './profile.component.html',
})
export class AppProfileComponent implements OnInit {
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  profile = signal<Profile | null>(null);

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const userId = this.authService.user.id;
    if (userId == null) {
      this.loading.set(false);
      this.error.set('No se encontró el usuario');
      return;
    }
    this.profileService.fetchProfile(userId).subscribe({
      next: (p) => {
        this.profile.set(p);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
        this.error.set('No se pudo cargar el perfil');
        this.loading.set(false);
      }
    })
  }

  onEdit(): void { /* pendiente */ }
  onDelete(): void { /* pendiente */ }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/profile/user-1.jpg';
  }
}

