import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para manejo de formularios
import { PrimeIcons, MenuItem } from 'primeng/api';
import { AccountService } from '../../../Services/Account.service';
import { AccountI } from '../../../Models/Account';
import { TypeAccountService } from '../../../Services/Type-Accounts.service';
import { TypeAccountI } from '../../../Models/typeAccount';
import { DropdownModule } from 'primeng/dropdown'; // Importar el módulo necesario
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Importa aquí
@Component({
  selector: 'app-servicios-Accounts',
  standalone: true,
  imports: [
    RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './Get-Delete-Account.component.html',
  styleUrls: ['./Get-Delete-Account.component.css'] // Corregido el atributo de estilos
})
export class GetDeleteAccountsComponent implements OnInit {
  // Variables públicas para vinculación con la vista
  public Accounts: AccountI[] = []; // Lista de cuentas
  public TypeAccount: TypeAccountI[] = []; // Tipos de cuentas disponibles
  public selectedAccount: AccountI | null = null; // Cuenta seleccionada para edición

  constructor(
    private accountService: AccountService, // Servicio para operaciones de cuentas
    private typeAccountService: TypeAccountService, // Servicio para obtener tipos de cuentas
    private router: Router // Router para navegación
  ) {}

  ngOnInit(): void {
    // Inicializar datos al cargar el componente
    this.loadTypeAccounts(); // Cargar tipos de cuentas
    this.loadAccounts();     // Cargar lista de cuentas
  }

  /**
   * Carga todos los tipos de cuentas desde el servicio.
   */
  loadTypeAccounts(): void {
    this.typeAccountService.getAllTypeAccount().subscribe({
      next: (data) => {
        this.TypeAccount = data.TypeAccounts || []; // Asignar datos
      },
      error: (err) => {
        console.error('Error al obtener los tipos de cuentas:', err);
      }
    });
  }

  /**
   * Carga todas las cuentas desde el servicio.
   * Además, agrega el nombre del tipo de cuenta correspondiente.
   */
  loadAccounts(): void {
    this.accountService.getAllAccount().subscribe({
      next: (data) => {
        this.Accounts = data.Accounts || [];
        this.GetTypeAccountName // Agregar nombre del tipo de cuenta
      },
      error: (err) => {
        console.error('Error al obtener las cuentas:', err);
      }
    });
  }

  /**
   * Mapea y agrega el nombre del tipo de cuenta a cada cuenta.
   */

  private GetTypeAccountName(): void {
    this.typeAccountService.getAllTypeAccount().subscribe({
      next: (data) => {
        this.TypeAccount = data.TypeAccounts || [];
      },
      error: (err) => {
        console.error('Error al obtener los tipos de cuentas:', err);
      }
    })
  }


  /**
   * Navega y elimina una cuenta por su ID.
   * @param id ID de la cuenta a eliminar.
   */
  deleteAccount(id: number): void {
    this.accountService.deleteAccount(id).subscribe({
      next: () => {
        console.log('Cuenta eliminada correctamente.');
        this.loadAccounts(); // Actualizar lista de cuentas
      },
      error: (err) => {
        console.error('Error al eliminar la cuenta:', err);
      }
    });
  }

  /**
   * Actualiza los datos de una cuenta.
   * @param account Cuenta actualizada.
   */
  updateAccount(account: AccountI): void {
    this.accountService.updateAccount(account.id, account).subscribe({
      next: () => {
        console.log('Cuenta actualizada correctamente.');
        this.loadAccounts(); // Actualizar lista
      },
      error: (err) => {
        console.error('Error al actualizar la cuenta:', err);
      }
    });
  }

  /**
   * Selecciona una cuenta para editar.
   * @param account Cuenta seleccionada.
   */
  selectAccount(account: AccountI): void {
    this.selectedAccount = { ...account }; // Crear una copia de la cuenta
  }

  /**
   * Navega a la página de creación de préstamos para el usuario asociado.
   * @param userId ID del usuario.
   */
  goToCreateLoan(userId: number): void {
    this.router.navigate(['/Loan/new', userId]);
  }
}
