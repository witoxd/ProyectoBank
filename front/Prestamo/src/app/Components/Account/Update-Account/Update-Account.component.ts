
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../Services/Account.service';
import { AccountI } from '../../../Models/Account';
import { TypeAccountService } from '../../../Services/Type-Accounts.service';
import { TypeAccountI } from '../../../Models/typeAccount';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-actualizar-Account',
  standalone: true,
  imports: [DropdownModule,
    CommonModule,
    ReactiveFormsModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './Update-Account.component.html',
  styleUrl: './Update-Account.component.css'
})
export class UpdateAccountComponent {
  public form: FormGroup;
  private AccountService = inject(AccountService);
  private TypeAccountService = inject(TypeAccountService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public UserID!: number;
  public AccountID!: number; // ID de la Account para actualizar
  public typesAccounts: { label: string, value: number }[] = [];
  public Account: AccountI[] = []

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      number: ['', [Validators.required]],
      TypeAccountID: ['', [Validators.required]],
      current_balance: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    // Obtener el UserID y AccountID de la URL
    this.activatedRoute.params.subscribe(params => {
      this.AccountID = +params['id']; // Se asume que la URL contiene el AccountID
    });

    // Cargar los tipos de Account desde el servicio
    this.TypeAccountService.getAllTypeAccount().subscribe(
      (data) => {
        this.typesAccounts = data.TypeAccounts.map(tc => ({
          label: tc.type,
          value: tc.id
        }));
      },
      (error) => {
        console.error('Error al obtener los tipos de Account:', error);
      }
    );

    // Cargar los datos de la Account existente
    this.AccountService.getOneAccount(this.AccountID).subscribe(
      (data) => {
        const Account = data; // Suponiendo que obtienes un array dentro de 'Accounts'
        if (Account) {
          this.form.patchValue({
            numero: Account.number,
            TypeAccountID: Account.TypeAccountID,
            saldo: Account.current_balance
          });
        } else {
          console.error('No se encontró la Account con la ID proporcionada');
        }
      },
      (error) => {
        console.error('Error al cargar los datos de la Account:', error);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/Accounts'); // Cambia la ruta según sea necesario
  }

  onSubmit(): void {
    const formValue: AccountI = {
      ...this.form.value,
      UserID: this.UserID, // Asignar el UserID recogido de la URL
    };

    this.AccountService.updateAccount(this.AccountID, formValue).subscribe(
      () => {
        this.router.navigateByUrl('/Accounts'); // Cambia la ruta según sea necesario
      },
      (err) => {
        console.error(err);
        console.log('No se ha actualizado correctamente');
      }
    );
  }
}
