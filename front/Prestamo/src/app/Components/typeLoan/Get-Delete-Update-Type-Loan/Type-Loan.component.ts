import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeLoanService } from '../../../Services/Type-Loan.service';
import { TypeLoanI } from '../../../Models/TypeLoan';

@Component({
  selector: 'app-crear-type-cuenta',
  templateUrl: './crear-type-cuenta.component.html',
  styleUrls: ['./crear-type-cuenta.component.css']
})
export class createtypeLoanComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private TypeLoanService: TypeLoanService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      descrption: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: TypeLoanI = this.form.value;
    this.TypeLoanService.createTypeLoan(formValue).subscribe(
      () => {
        console.log('type de cuenta creado correctamente');
        this.router.navigateByUrl('/TypeLoan');
      },
      err => {
        console.error('Error al crear type de cuenta:', err);
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/TypeLoan');
  }
}


