// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoansService } from '../../../Services/Loans.service';
// import { LoanI } from '../../../Models/Loans';
// import { CardModule } from 'primeng/card';
// import { ButtonModule } from 'primeng/button';
// //import { ToastService } from 'primeng/toast';  Asegúrate de importar ToastService si deseas usarlo

// @Component({
//   selector: 'app-crear-Loans',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     CardModule,
//     ButtonModule,
//   ],
//   templateUrl: './crear-Loans.component.html',
//   styleUrls: ['./crear-Loans.component.css'],
// })
// export class CrearLoansComponent implements OnInit {
//   public form: FormGroup;
//   private LoansService = inject(LoansService);
//   private router = inject(Router);
//   // private toastService = inject(ToastService); // Descomentar si deseas usar el servicio de Toast

//   constructor(private formBuilder: FormBuilder) {
//     this.form = this.formBuilder.group({
//       UserID: ['', [Validators.required]],
//       empleadoID: ['', [Validators.required]],
//       fechaLoans: ['', [Validators.required]],
//       TypeLoan: ['', [Validators.required]],
//       ammount_loan: [0, [Validators.required, Validators.min(0)]], // El monto debe ser mayor o igual a 0
//       interests: [0, [Validators.required, Validators.min(0)]], // El interés debe ser mayor o igual a 0
//       is_active: [true, [Validators.required]], // is_active por defecto a "true"
//     });
//   }

//   ngOnInit() {}

//   cancel() {
//     this.router.navigateByUrl('/Loanss'); // Cambia la ruta según sea necesario
//   }

//   onSubmit(): void {
//     const formValue: LoanI = this.form.value;
//     this.LoansService.createLoans(formValue).subscribe(
//       () => {
//         // this.toastService.add({ severity: 'success', summary: 'Éxito', detail: 'Préstamo creado correctamente.' }); // Descomentar si usas el servicio de Toast
//         this.router.navigateByUrl('/Loanss'); // Cambia la ruta según sea necesario
//       },
//       (err) => {
//         console.error(err);
//         // this.toastService.add({ severity: 'error', summary: 'Error', detail: 'No se ha creado correctamente.' }); // Descomentar si usas el servicio de Toast
//       }
//     );
//   }
// }



import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute añadido para obtener el UserID
import { LoansService } from '../../../Services/Loans.service';
import { TypeLoanService } from '../../../Services/Type-Loan.service';  // Nuevo servicio para tipos de préstamos
import { LoanI } from '../../../Models/Loan';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { state } from '@angular/animations';

@Component({
  selector: 'app-Create-Loan',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './Create-Loan.component.html',
  styleUrls: ['./Create-Loan.component.css'],
})
export class CreateLoansComponent implements OnInit {
  public form: FormGroup;
  private LoansService = inject(LoansService);
  private TypeLoanService = inject(TypeLoanService);  // Servicio de tipo préstamo
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);  // Para obtener el UserID de la URL
  public UserID!: number;
  public tiposLoanss: { label: string, value: number }[] = []; // Opciones del dropdown de tipos de préstamo

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      UserID: ['', [Validators.required]],
      date_loan: ['', [Validators.required]],
      type_loanID: ['', [Validators.required]],  // Nuevo campo para tipo de préstamo
      amount_loan: [0, [Validators.required]],
      interests: [0, [Validators.required]],
      state: [true, [Validators.required]],
    });
  }

  ngOnInit() {
    // Obtener el UserID de la URL
    this.activatedRoute.params.subscribe(params => {
      this.UserID = +params['id']; // Se asume que la URL contiene el UserID
    });

    // Cargar los tipos de préstamo desde el servicio
    this.TypeLoanService.getAllTypeLoan().subscribe(
      (data) => {
        this.tiposLoanss = data.TypeLoans.map(tp => ({
          label: tp.type, // Campo que muestra el tipo de préstamo
          value: tp.id   // Campo que representa el valor del tipo de préstamo
        }));
      },
      (error) => {
        console.error('Error al obtener los tipos de préstamo:', error);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/Loan'); // Navega a la ruta de préstamos
  }

  onSubmit(): void {
    const formValue: LoanI = {
      ...this.form.value,
      UserID: this.UserID, // Asignar el UserID recogido de la URL
    };

    this.LoansService.createLoans(formValue).subscribe(
      () => {
        this.router.navigateByUrl('/Loan'); // Navega a la ruta de préstamos
        console.log("LOAN Create OK");
      },
      (err) => {
        console.error('Error al crear el préstamo:', err);
        console.log(formValue);
      }
    );
  }
}

