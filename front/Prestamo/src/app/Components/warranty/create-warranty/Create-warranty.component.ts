import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { warrantysService } from '../../../Services/warrantys.service';
import { Router, ActivatedRoute } from '@angular/router';
import { warrantyI } from '../../../Models/warranty';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-warranty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './Create-warranty.component.html',
  styleUrls: ['./Create-warranty.component.css']
})
export class CreatewarrantyComponent implements OnInit {
  public form: FormGroup;
  public LoanID!: number; // Para almacenar el LoanID obtenido de la URL

  warrantysService = inject(warrantysService);
  private activatedRoute = inject(ActivatedRoute); // Inyectar ActivatedRoute para obtener parámetros de la URL
  private router = inject(Router); // Inyectar el Router para navegar entre rutas

  constructor(private formBuilder: FormBuilder) {
    // Inicializa el formulario aquí
    this.form = this.formBuilder.group({
      LoanID: [{ value: '', disabled: true }, [Validators.required]], // Campo deshabilitado porque se obtiene de la URL
      type_warranty: ['', [Validators.required]],
      value_warranty: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Obtener el LoanID de la URL
    this.activatedRoute.params.subscribe((params) => {
      this.LoanID = +params['id']; // Convertir el parámetro en número
      this.form.patchValue({ LoanID: this.LoanID }); // Actualizar el formulario con el LoanID
      console.log('LoanID obtenido:', this.LoanID);
    });
  }

  onSubmit(): void {
    const formValue: warrantyI = {
      ...this.form.getRawValue(), // Obtener los valores del formulario, incluidos los deshabilitados
    };

    console.log('Datos enviados:', formValue);

    this.warrantysService.createwarrantys(formValue).subscribe(
      () => {
        console.log('Garantía creada correctamente');
        this.router.navigateByUrl('/warranty');
      },
      (err) => {
        console.error(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/warranty');
  }

  // Getters para facilitar el acceso a los controles del formulario
  get type_warranty() {
    return this.form.get('type_warranty');
  }
  get value_warranty() {
    return this.form.get('value_warranty');
  }
  get description() {
    return this.form.get('description');
  }
}
