import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PrimeIcons, MenuItem } from 'primeng/api';
import { AccountService } from '../../../Services/Account.service';
import { AccountI } from '../../../Models/Account';
import { TypeAccountService } from '../../../Services/Type-Accounts.service';
import { TypeAccountI } from '../../../Models/typeAccount';


@Component({
  selector: 'app-servicios-Accounts',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './Get-Delete-Account.component.html',
  styleUrl: './Get-Delete-Account.component.css'
})
export class GetDeleteAccountsComponent implements OnInit {
  public Accounts:AccountI[] = []
  public TypeAccount:TypeAccountI[] = []
  constructor(
    private AccountService: AccountService,
    private router: Router,
private TypeAccountService: TypeAccountService
  ) { }

  ngOnInit(): void {
    this.MostrarUnTipoAccount(); // Cargar los tipos de Account primero
    this.mostrarAccounts();      // Luego cargar las Accounts
  }

  

  mostrarAccounts() {
    this.AccountService.getAllAccount()
      .subscribe({
        next: (data) => {
          this.Accounts = data.Accounts;
  
          // Asegúrate de que TypeAccount está cargado antes de asignar el nombre del tipo de Account
          this.Accounts.forEach(Account => {
            const tipoAccount = this.TypeAccount.find(tc => tc.id === Account.TypeAccountID);
            Account['nombreTipoCuenta'] = tipoAccount ? tipoAccount.type : ''; // Asigna el nombre del tipo de Account
          });
  
          console.log(this.Accounts);
        }
      });
  }
  
  


  MostrarUnTipoAccount(){
    this.TypeAccountService.getAllTypeAccount().subscribe(
      (data) => {
this.TypeAccount = data.TypeAccounts
      },
      (error) => {
        console.error('Error al obtener los tipos de Account:', error);
      }
    );
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/Accounts');
    this.AccountService.deleteAccount(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Accountss Eliminado', life:5000});
        this.mostrarAccounts();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/Accounts');

      }
    );
  }

  actualizarAccounts(Accounts: AccountI): void {
    this.AccountService.updateAccount(Accounts.id, Accounts).subscribe(
      () => {
        console.log('Accountss actualizado correctamente');
        // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
      },
      err => {
        console.error('Error al actualizar Accountss:', err);
      }
    );
  }
}
