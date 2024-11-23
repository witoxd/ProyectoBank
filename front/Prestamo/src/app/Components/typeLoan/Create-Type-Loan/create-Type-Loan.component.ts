import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeLoanService } from '../../../Services/Type-Loan.service';
import { TypeLoanI } from '../../../Models/TypeLoan';

@Component({
  selector: 'app-crear-type-Loan',
  templateUrl: './create-Type-Loan.component.html',
  styleUrls: ['./create-Type-Loan.component.css']
})
export class CreartypeLoanComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private TypeLoanService: TypeLoanService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: TypeLoanI = this.form.value;
    this.TypeLoanService.createTypeLoan(formValue).subscribe(
      () => {
        console.log('type de Loan creado correctamente');
        this.router.navigateByUrl('/TypeLoan');
      },
      err => {
        console.error('Error al crear type de Loan:', err);
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/TypeLoan');
  }
}
