import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoansService } from '../../../Services/Loans.service';
import { LoanI } from '../../../Models/Loan';
import { TypeLoanService } from '../../../Services/Type-Loan.service';
import { TypeLoanI } from '../../../Models/TypeLoan';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-actualizar-loan',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './update-Loan.component.html',
  styleUrls: ['./update-Loan.component.css'],
})
export class updateLoanComponent implements OnInit {
  public form: FormGroup;
  private loansService = inject(LoansService);
  private typeLoanService = inject(TypeLoanService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public userID!: number;
  public loanID!: number; // ID del préstamo para actualizar
  public typeloan: { label: string; value: number }[] = []; // Opciones para el dropdown

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      date_loan: ['', [Validators.required]],
      type_loanID: [null, [Validators.required]],
      amount_loan: [0, [Validators.required, Validators.min(0)]],
      interests: [0, [Validators.required, Validators.min(0)]],
      state: [false],
    });
  }

  ngOnInit() {
    // Obtener loanID de la URL
    this.activatedRoute.params.subscribe((params) => {
      this.loanID = +params['id'];
    });

    // Cargar los tipos de préstamo desde el servicio
    this.typeLoanService.getAllTypeLoan().subscribe(
      (data) => {
        this.typeloan = data.TypeLoans.map((tp: TypeLoanI) => ({
          label: tp.type,
          value: tp.id,
        }));
      },
      (error) => {
        console.error('Error al obtener los tipos de préstamo:', error);
      }
    );

    // Cargar los datos del préstamo existente
    this.loansService.getOneLoans(this.loanID).subscribe(
      (data) => {
        const loan = data.Loans[0]; // Asumiendo que se devuelve un array
        if (loan) {
          this.form.patchValue({
            date_loan: loan.date_loan,
            type_loanID: loan.type_loanID,
            amount_loan: loan.amount_loan,
            interests: loan.interests,
            state: loan.state,
          });
        } else {
          console.error('No se encontró el préstamo con la ID proporcionada');
        }
      },
      (error) => {
        console.error('Error al cargar los datos del préstamo:', error);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/Loans');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.error('El formulario no es válido');
      return;
    }

    const formValue: LoanI = {
      ...this.form.value,
      UserID: this.userID, // Asignar el UserID recogido de la URL
      empleadoID: 1, // Asumir un empleadoID o modificar según necesidades
    };

    this.loansService.updateLoans(this.loanID, formValue).subscribe(
      () => {
        this.router.navigateByUrl('/Loans');
      },
      (err) => {
        console.error(err);
        console.log('No se ha actualizado correctamente');
      }
    );
  }
}
