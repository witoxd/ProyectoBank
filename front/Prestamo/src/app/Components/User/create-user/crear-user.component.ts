import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Services/User.service';
import { Router } from '@angular/router';
import { UserI } from '../../../Models/User';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-User',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'] // Cambia styleUrl a styleUrls
})
export class CrearUserComponent implements OnInit {
  public form: FormGroup;

  UserService = inject(UserService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Inicializa el formulario aquí
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: UserI = this.form.value;
    console.log(formValue);
    this.UserService.createUser(formValue).subscribe(
      () => {
        console.log('User creado correctamente');
        this.router.navigateByUrl('User');
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/User');
  }

  get name() { return this.form.get('name'); }
  get adress() { return this.form.get('adress'); }
  get phone() { return this.form.get('phone'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}

