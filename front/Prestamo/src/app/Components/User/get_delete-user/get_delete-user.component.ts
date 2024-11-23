import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/User.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { UserI } from '../../../Models/User';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PrimeIcons, MenuItem } from 'primeng/api';


@Component({
  selector: 'app-mostrar-User',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.css'
})
export class MostrarUserComponent implements OnInit {
  public Users:UserI[] = []
  constructor(
    private UserService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarUsers()
  }

  

  mostrarUsers() {
    this.UserService.getAllUser()
      .subscribe(
         (data) => {
          this.Users = data.Users
          console.log(this.Users)
        }
      )
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/Users');
    this.UserService.deleteUser(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'User Eliminado', life:5000});
        this.mostrarUsers();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/Users');

      }
    );
  }

  actualizarUser(User: UserI): void {
    this.UserService.updateUser(User.id, User).subscribe(
      () => {
        console.log('User actualizado correctamente');
        // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
      },
      err => {
        console.error('Error al actualizar User:', err);
      }
    );
  }
}
