import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeAccountService } from '../../../Services/Type-Accounts.service';
import { TypeAccountI } from '../../../Models/typeAccount';

@Component({
  selector: 'app-crear-tipo-cuenta',
  templateUrl: './crear-tipo-prestamo.component.html',
  styleUrls: ['./crear-tipo-prestamo.component.css']
})
export class CreateTypeAccountComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private TypeAccountService: TypeAccountService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: TypeAccountI = this.form.value;
    this.TypeAccountService.createTypeAccount(formValue).subscribe(
      () => {
        console.log('Tipo de cuenta creado correctamente');
        this.router.navigateByUrl('/TypeAccounts');
      },
      err => {
        console.error('Error al crear tipo de cuenta:', err);
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/TypeAccounts');
  }
}
