import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FarmerService } from 'src/app/services/apps/catalog/farmer.service';
import { EnclosureService } from 'src/app/services/apps/enclosures/enclosure.service';
import { AppEnclosuresTableComponent } from './enclosures-table.component';
import { Enclosure } from 'src/app/shared/model/enclosure';

@Component({
  selector: 'app-enclosures',
  templateUrl: './enclosures.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, TablerIconsModule, AppEnclosuresTableComponent],
  standalone: true,
})
export class AppEnclosuresComponent implements OnInit {
  // UI state
  searchText = signal<string>('');
  enclosures = signal<Enclosure[]>([]);

  // Identity
  userId: number | null = null;
  farmerId: number | null = null;

  constructor(
    private authService: AuthService,
    private farmerService: FarmerService,
    private enclosureService: EnclosureService,
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
          if (this.farmerId != null) {
            this.loadEnclosures(this.farmerId);
          }
        },
        error: (err) => {
          console.error('No se pudo obtener el farmerId del usuario actual:', err);
        }
      });
    }
  }

  private loadEnclosures(farmerId: number): void {
    this.enclosureService.getEnclosuresByFarmer(farmerId).subscribe({
      next: (data) => this.enclosures.set(data ?? []),
      error: (err) => console.error('Error cargando recintos:', err),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchText.set(filterValue);
    // La lógica de filtrado se aplicará sobre la tabla próximamente.
  }

  onAddEnclosure(): void {
    // Aquí luego abriremos el modal de creación de recinto.
  }

  onEdit(row: Enclosure): void {
    // TODO: abrir modal de edición
  }

  onDelete(row: Enclosure): void {
    // TODO: confirmar y eliminar
  }
}
