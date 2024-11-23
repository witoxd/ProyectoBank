
import { Component, OnInit } from '@angular/core';
import { warrantysService } from '../../../Services/warrantys.service';
import { Router } from '@angular/router';
import { warrantyI } from '../../../Models/warranty';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router'; 
import { UserI } from '../../../Models/User';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PrimeIcons, MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios-warranty',
  standalone: true,
  imports: [TableModule, 
    
    ButtonModule,   
    FormsModule, 
    CardModule, 
    PanelMenuModule, 
    RouterModule,
    CommonModule],
  templateUrl: './GDU-warranty.component.html',
  styleUrl: './GDU-warranty.component.css'
})
export class GDUwarrantyComponent implements OnInit {

  public warrantys: warrantyI[] = [];

  constructor(
    private warrantysService: warrantysService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarwarrantys();
  }

  mostrarwarrantys() {
    this.warrantysService.getAllwarrantys()
      .subscribe({
        next: (data) => {
          this.warrantys = data.warrantys;
          console.log(this.warrantys);
        }
      });
  }

  eliminar(id: number): void {
    this.warrantysService.deletewarrantys(id).subscribe(
      () => {
        this.mostrarwarrantys();
      },
      err => {
        console.log('Error al eliminar');
      }
    );
  }

  Updatewarranty(warranty: warrantyI): void {
    this.warrantysService.updatewarrantys(warranty.id, warranty).subscribe(
      () => {
        console.log('Garantía actualizada correctamente');
      },
      err => {
        console.error('Error al actualizar garantía:', err);
      }
    );
  }

}
