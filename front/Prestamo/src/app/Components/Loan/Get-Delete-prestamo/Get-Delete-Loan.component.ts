// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router'; 
// import { CardModule } from 'primeng/card';
// import { PanelMenuModule } from 'primeng/panelmenu';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
// import { PrimeIcons, MenuItem } from 'primeng/api';
// import { LoansService } from '../../../Services/Loans.service';
// import { LoanI } from '../../../Models/Loans';


// @Component({
//   selector: 'app-servicios-Loanss',
//   standalone: true,
//   imports: [RouterModule,
//     PanelMenuModule,
//     FormsModule,
//     TableModule,
//     CardModule,
//     ButtonModule
//   ],
//   templateUrl: './servicios-Loans.component.html',
//   styleUrl: './servicios-Loans.component.css'
// })
// export class serviciosLoanssComponent implements OnInit {
//   public Loanss:LoanI[] = []
//   constructor(
//     private LoansService: LoansService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.GetLoanss()
//   }

  

//   GetLoanss() {
//     this.LoansService.getAllLoans()
//       .subscribe(
//          (data) => {
//           this.Loanss = data.Loanss
//           console.log(this.Loanss)
        
//       })
//   }

//   eliminar(id: number): void{
//     this.router.navigateByUrl('/Loans');
//     this.LoansService.deleteLoans(id).subscribe(
//       () => {
//         // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Loansss Eliminado', life:5000});
//         this.GetLoanss();
//       },
//       err => {
//         console.log('error')
//         this.router.navigateByUrl('/Loans');

//       }
//     );
//   }

//   actualizarLoanss(Loanss: LoanI): void {
//     this.LoansService.updateLoans(Loanss.id, Loanss).subscribe(
//       () => {
//         console.log('Loansss actualizado correctamente');
//         // Aquí puedes agregar una notificación o mensaje de éxito si lo deseas
//       },
//       err => {
//         console.error('Error al actualizar Loansss:', err);
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoansService } from '../../../Services/Loans.service';
import { LoanI } from '../../../Models/Loan';
import { TypeLoanService } from '../../../Services/Type-Loan.service'; // Nuevo servicio para tipos de préstamo
import { TypeLoanI } from '../../../Models/TypeLoan'; // Modelo para tipos de préstamo
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-servicios-Loanss',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './Get-Delete-Loan.component.html',
  styleUrl: './Get-Delete-Loan.component.css'
})
export class GetDeleteLoansComponent implements OnInit {
  public Loans: LoanI[] = [];
  public TipoLoanss: TypeLoanI[] = []; // Almacena los tipos de préstamo

  constructor(
    private LoansService: LoansService,
    private TypeLoanService: TypeLoanService, // Inyecta el servicio de tipos de préstamo
    private router: Router
  ) {}

  ngOnInit(): void {
    this.GetTiposLoans(); // Carga los tipos de préstamo primero
    this.GetLoans();     // Luego carga los préstamos
  }

  GetLoans(): void {
    this.LoansService.getAllLoans().subscribe({
      next: (data) => {
        this.Loans = data.Loans;
console.log(this.Loans);
        // Asegúrate de que TipoLoanss está cargado antes de asignar el nombre del tipo de préstamo
        this.Loans.forEach(Loans => {
          const tipoLoans = this.TipoLoanss.find(tp => tp.id === Loans.type_loanID);
          Loans['nombreTipoPrestamo'] = tipoLoans ? tipoLoans.type : ''; // Asigna el nombre del tipo de préstamo
        });

        console.log(this.Loans);
      },
      error: (err) => {
        console.error('Error al cargar préstamos:', err);
      }
    });
  }

  GetTiposLoans(): void {
    this.TypeLoanService.getAllTypeLoan().subscribe({
      next: (data) => {
        this.TipoLoanss = data.TypeLoans;
      },
      error: (err) => {
        console.error('Error al cargar tipos de préstamo:', err);
      }
    });
  }

  UpdateLoanss(Loans: LoanI): void {
    this.LoansService.updateLoans(Loans.id, Loans).subscribe(
      () => {
        console.log('Préstamo actualizado correctamente');
      },
      err => {
        console.error('Error al actualizar préstamo:', err);
      }
    );
  }

  delete(id: number): void {
    this.LoansService.deleteLoans(id).subscribe(
      () => {
        this.GetLoans();
      },
      err => {
        console.error('Error al eliminar préstamo:', err);
      }
    );
  }
}
