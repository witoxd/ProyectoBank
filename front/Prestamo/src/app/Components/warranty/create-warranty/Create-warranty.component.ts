
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { warrantysService } from '../../../Services/warrantys.service';
import { Router } from '@angular/router';
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
  styleUrl: './Create-warranty.component.css'
})
export class CreatewarrantyComponent {
  public form: FormGroup;

  warrantysService = inject(warrantysService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Inicializa el formulario aquí
    this.form = this.formBuilder.group({
      LoanID: ['', [Validators.required]],
      type_warranty: ['', [Validators.required]],
      value_warranty: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: warrantyI = this.form.value;
    console.log(formValue);
    this.warrantysService.createwarrantys(formValue).subscribe(
      () => {
        console.log('warranty creado correctamente');
        this.router.navigateByUrl('warrantys');
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/warrantys');
  }

  get LoanID() { return this.form.get('LoanID'); }
  get type_warranty() { return this.form.get('type_warranty'); }
  get value_warranty() { return this.form.get('value_warranty'); }
  get description() { return this.form.get('description'); }
}
