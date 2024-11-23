// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AccountService } from '../../../Services/Account.service';
// import { AccountI } from '../../../Models/Account';
// import { RouterModule } from '@angular/router'; 
// import { CardModule } from 'primeng/card';
// import { PanelMenuModule } from 'primeng/panelmenu';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
// import { PrimeIcons, MenuItem } from 'primeng/api';

// @Component({
//   selector: 'app-crear-Account',
//   standalone: true,
//   imports: [CommonModule, 
//     ReactiveFormsModule,
//     PanelMenuModule,
//     FormsModule,
//     TableModule,
//     CardModule,
//     ButtonModule],
//   templateUrl: './crear-Account.component.html',
//   styleUrls: ['./crear-Account.component.css'],
// })
// export class CrearAccountComponent implements OnInit {
//   public form: FormGroup;
//   private AccountService = inject(AccountService);
//   private router = inject(Router);


//   constructor(private formBuilder: FormBuilder) {
//     this.form = this.formBuilder.group({
//       UserID: ['', [Validators.required]],
//       number: ['', [Validators.required]],
//       TypeAccount: ['', [Validators.required]],
//       saldo: [0, [Validators.required, Validators.min(0)]], // El saldo debe ser mayor o igual a 0
//     });
//   }

//   ngOnInit() {
//     const id = this.router.snapshot.params['id'];
  
//   }

//   cancel() {
//     this.router.navigateByUrl('/Accounts'); // Cambia la ruta según sea necesario
//   }

//   onSubmit(): void {
//     const formValue: AccountI = this.form.value;
//     this.AccountService.createAccount(formValue).subscribe(
//       () => {
//         this.router.navigateByUrl('/Accounts'); // Cambia la ruta según sea necesario
//       },
//       (err) => {
//         console.error(err);
//         console.log('No se ha creado correctamente');}
//     );
//   }
// }

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
  selector: 'app-crear-Account',
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
  templateUrl: './Create-Account.component.html',
  styleUrls: ['./Create-Account.component.css'],
})
export class CrearAccountComponent implements OnInit {
  public form: FormGroup;
  private AccountService = inject(AccountService);
  private TypeAccountService = inject(TypeAccountService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public UserID!: number;
  public TypeAccount: { label: string, value: number }[] = [];

  constructor(private formBuilder: FormBuilder) {
    
    this.form = this.formBuilder.group({
      number: ['', [Validators.required]],
      TypeAccountID: ['', [Validators.required]],
      current_balance: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    // Obtener el UserID de la URL
    this.activatedRoute.params.subscribe(params => {
      this.UserID = +params['id']; // Se asume que la URL contiene el UserID
      console.log('UserID:', this.UserID);
    });

    // Cargar los tipos de Account desde el servicio
    this.TypeAccountService.getAllTypeAccount().subscribe(
      (data) => {
        // this.tiposAccount = data.TypeAccounts;
        this.TypeAccount = data.TypeAccounts.map(tc => ({
          label: tc.type, // Suponiendo que "nombre" es el campo que quieres mostrar
          value: tc.id // Suponiendo que "id" es el identificador del tipo de Account
      }));
      },
      (error) => {
        console.error('Error al obtener los tipos de Account:', error);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/User'); // Cambia la ruta según sea necesario
  }

  onSubmit(): void {
    const formValue: AccountI = {
      ...this.form.value,
      UserID: this.UserID, // Asignar el UserID recogido de la URL
    };
    
    console.log('Datos enviados:', formValue); 

    this.AccountService.createAccount(formValue).subscribe(
      () => {
        this.router.navigateByUrl('/User'); // Cambia la ruta según sea necesario
      },
      (err) => {
        console.error(err);
        console.log('No se ha creado correctamente');
      }
    );
  }
}
