import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../Services/User.service';
import { UserI } from '../../../Models/User';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-User',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'] 
})
export class updateUserComponent implements OnInit {
  public form: FormGroup;

  UserService = inject(UserService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getUser(id);
  }

  getUser(id: number) {
    this.UserService.getOneUser(id)
      .subscribe({
        next: (data) => {
          this.form.setValue(data.User);
        },
        error: (err) => {
          console.error('Error al obtener User:', err);
          // Manejo adicional de errores (notificaciones, etc.)
        }
      });
  }

  /**
   * onSubmit: Actualiza un User en la base de datos.
   *
   * Se llama al método updateUser de UserService, pasando el id del User
   * y el formulario actualizado.
   *
   * Si el User se actualiza correctamente, se muestra un mensaje en consola
   * y se redirige al usuario a la ruta '/User'.
   *
   * Si ocurre un error, se muestra un mensaje en consola con el error.
   */
  onSubmit(): void {
    const formValue: UserI = this.form.value;
    const id: number = this.form.value.id;
    this.UserService.updateUser(id, formValue).subscribe(
      () => {
        console.log('User actualizado correctamente');
        this.router.navigateByUrl('User');
      },
      err => {
        console.error('Error al actualizar User:', err);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/Users');
  }

  get name() { return this.form.get('name'); }
  get adress() { return this.form.get('adress'); } // Corregido el nombre
  get avatar() { return this.form.get('avatar'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
