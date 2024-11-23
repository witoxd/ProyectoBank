import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PrimeIcons, MenuItem } from 'primeng/api';
import { AmortizationService } from '../../../Services/Amortization.service';
import { AmortizationI } from '../../../Models/Amortization';

@Component({
  selector: 'app-servicios-Amortizationes',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './GDU-Amortization.component.html',
  styleUrl: './GDU-Amortization.component.css'
})
export class GDUAmortizationComponent implements OnInit {
  public Amortizationes: AmortizationI[] = [];

  constructor(
    private amortizationService: AmortizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAmortizations();
  }

  getAmortizations() {
    this.amortizationService.getAllAmortization().subscribe(
      (data) => {
        this.Amortizationes = data.Amortizationes;
        console.log(this.Amortizationes);
      },
      (err) => {
        console.error('Error al obtener las amortizaciones:', err);
      }
    );
  }

  deleteAmortization(id: number): void {
    this.amortizationService.deleteAmortization(id).subscribe(
      () => {
        console.log(`Amortización con ID ${id} eliminada`);
        this.getAmortizations();
      },
      (err) => {
        console.error('Error al eliminar la amortización:', err);
      }
    );
  }

  updateAmortization(amortization: AmortizationI): void {
    this.amortizationService.updateAmortization(amortization.id, amortization).subscribe(
      () => {
        console.log('Amortización actualizada correctamente');
      },
      (err) => {
        console.error('Error al actualizar la amortización:', err);
      }
    );
  }
}
