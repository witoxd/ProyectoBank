import { Component, OnInit } from '@angular/core';
import { TypeAccountService } from '../../../Services/Type-Accounts.service';
import { Router } from '@angular/router';
import { TypeAccountI } from '../../../Models/typeAccount';

@Component({
  selector: 'app-mostrar-tipo-cuenta',
  templateUrl: './mostrar-tipo-cuenta.component.html',
  styleUrls: ['./mostrar-tipo-cuenta.component.css']
})
export class GetDeleteUpdateTypeAccountComponent implements OnInit {
  public TypeAccounts: TypeAccountI[] = [];

  constructor(
    private TypeAccountService: TypeAccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.GetTypeAccounts();
  }

  GetTypeAccounts(): void {
    this.TypeAccountService.getAllTypeAccount()
      .subscribe({
        next: (data) => {
          this.TypeAccounts = data.TypeAccounts;
        },
        error: (err) => {
          console.error('Error al obtener tipos de cuentas:', err);
        }
      });
  }

  Delete(id: number): void {
    this.TypeAccountService.deleteTypeAccount(id).subscribe(
      () => {
        this.GetTypeAccounts(); // Actualiza la lista después de eliminar
      },
      err => {
        console.error('Error al eliminar el tipo de cuenta:', err);
      }
    );
  }

  UpdateTypeAccount(TypeAccount: TypeAccountI): void {
    this.TypeAccountService.updateTypeAccount(TypeAccount.id, TypeAccount).subscribe(
      () => {
        console.log('Tipo de cuenta actualizado correctamente');
      },
      err => {
        console.error('Error al actualizar el tipo de cuenta:', err);
      }
    );
  }
}

