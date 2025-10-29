import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Enclosure } from 'src/app/shared/model/enclosure';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-enclosures-table',
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule],
  template: `
    <mat-card class="cardWithShadow m-t-16">
      <mat-card-content>
        <div class="table-responsive">
          <table mat-table [dataSource]="dataSource" matSort>
            <!-- # Column -->
            <ng-container matColumnDef="index">
              <th mat-header-cell *matHeaderCellDef>#</th>
              <td mat-cell *matCellDef="let _row; let i = index">
                {{ getRowIndex(i) }}
              </td>
            </ng-container>

            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre</th>
              <td mat-cell *matCellDef="let row">{{ row.name }}</td>
            </ng-container>

            <!-- Capacity Column -->
            <ng-container matColumnDef="capacity">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Capacidad</th>
              <td mat-cell *matCellDef="let row">{{ row.capacity }}</td>
            </ng-container>

            <!-- Type Column -->
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Tipo</th>
              <td mat-cell *matCellDef="let row">{{ row.type }}</td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let row" class="d-flex gap-8">
                <button mat-icon-button color="primary" (click)="onEdit(row)">
                  <i-tabler name="edit" class="icon-18 d-flex"></i-tabler>
                </button>
                <button mat-icon-button color="warn" (click)="onDelete(row)">
                  <i-tabler name="trash" class="icon-18 d-flex"></i-tabler>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
        <mat-paginator [pageSize]="10" [pageSizeOptions]="[5,10,25]" showFirstLastButtons></mat-paginator>
      </mat-card-content>
    </mat-card>
  `,
})
export class AppEnclosuresTableComponent implements OnChanges {
  @Input() data: Enclosure[] = [];
  @Input() filter: string = '';

  @Output() editRequested = new EventEmitter<Enclosure>();
  @Output() deleteRequested = new EventEmitter<Enclosure>();

  displayedColumns: string[] = ['index', 'name', 'capacity', 'type', 'actions'];
  dataSource = new MatTableDataSource<Enclosure>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data ?? [];
      // rebind paginator/sort if available
      Promise.resolve().then(() => this.bindTableHelpers());
    }
    if (changes['filter']) {
      this.applyFilter(this.filter || '');
    }
  }

  private bindTableHelpers(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
    // custom filter: name or type contains text
    this.dataSource.filterPredicate = (row, term) => {
      const t = term.trim().toLowerCase();
      return (
        (row.name ?? '').toLowerCase().includes(t) ||
        (row.type ?? '').toLowerCase().includes(t)
      );
    };
  }

  applyFilter(value: string) {
    this.dataSource.filter = (value || '').trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  getRowIndex(i: number): number {
    const pageIndex = this.dataSource.paginator?.pageIndex ?? 0;
    const pageSize = this.dataSource.paginator?.pageSize ?? this.dataSource.data.length;
    return pageIndex * pageSize + i + 1;
  }

  onEdit(row: Enclosure) { this.editRequested.emit(row); }
  onDelete(row: Enclosure) { this.deleteRequested.emit(row); }
}

