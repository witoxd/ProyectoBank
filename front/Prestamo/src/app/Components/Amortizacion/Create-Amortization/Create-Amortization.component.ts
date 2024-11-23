import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmortizationService } from '../../../Services/Amortization.service';
import { AmortizationI } from '../../../Models/Amortization';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crear-AmortizacreateAmortization',
  standalone: true,
  imports: [CommonModule, 
    CardModule, 
    PanelMenuModule, 
    TableModule, 
    ButtonModule, 
    ReactiveFormsModule],
  templateUrl: './Create-Amortization.component.html',
  styleUrls: ['./Create-Amortization.component.css'],
})
export class CrearAmortizacreateAmortizationComponent implements OnInit {
  public form: FormGroup;
  private AmortizationService = inject(AmortizationService);
  private router = inject(Router);

  /**
   * Constructor que inicializa el formulario de creación de amortización
   * con los campos prestamosID, fecha, monto y estado.
   * @param formBuilder Inyección del FormBuilder para crear el formulario
   */
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      prestamosID: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      estado: [true], // Valor por defecto
    });
  }

  ngOnInit() {}

  cancel() {
    this.router.navigateByUrl('/AmortizacreateAmortizationes'); // Cambia la ruta según sea necesario
  }

  onSubmit(): void {
    const formValue: AmortizationI = this.form.value;
    this.AmortizationService.createAmortization(formValue).subscribe(
      () => {
        this.router.navigateByUrl('/AmortizacreateAmortizationes'); // Cambia la ruta según sea necesario
      },
      (err) => {
        console.error(err);
        console.log('No se ha creado correctamente');}
    );
  }
}

