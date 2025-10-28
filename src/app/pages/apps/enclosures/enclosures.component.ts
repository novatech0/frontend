import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FarmerService } from 'src/app/services/apps/catalog/farmer.service';

@Component({
  selector: 'app-enclosures',
  templateUrl: './enclosures.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, TablerIconsModule],
  standalone: true,
})
export class AppEnclosuresComponent implements OnInit {
  // UI state
  searchText = signal<string>('');

  // Identity
  userId: number | null = null;
  farmerId: number | null = null;

  constructor(
    private authService: AuthService,
    private farmerService: FarmerService,
  ) {}

  ngOnInit(): void {
    // Obtener userId guardado al iniciar sesión
    this.userId = this.authService.user.id;

    if (this.userId != null) {
      // Resolver farmerId a partir del userId
      this.farmerService.getFarmerByUserId(this.userId).subscribe({
        next: (farmer) => {
          // La entidad Farmer tiene "farmerId"
          // Nota: si el backend cambia el nombre, ajustar aquí
          // @ts-ignore: acceso tolerado por localización del modelo Farmer
          this.farmerId = farmer.farmerId ?? farmer.id ?? null;
        },
        error: (err) => {
          console.error('No se pudo obtener el farmerId del usuario actual:', err);
        }
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchText.set(filterValue);
    // La lógica de filtrado se aplicará sobre la tabla próximamente.
  }

  onAddEnclosure(): void {
    // Aquí luego abriremos el modal de creación de recinto.
  }
}
