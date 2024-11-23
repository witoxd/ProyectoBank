import { Routes } from '@angular/router';
import { MostrarUserComponent } from './Components/User/get_delete-user/get_delete-user.component';
import { CrearUserComponent } from './Components/User/create-user/crear-user.component';

import { GetDeleteAccountsComponent } from './Components/Account/Get-Delete-Account/Get-Delete-Account.component';
import { GetDeleteLoansComponent } from './Components/Loan/Get-Delete-prestamo/Get-Delete-Loan.component';
import { GDUAmortizationComponent } from './Components/Amortizacion/GDU-Amortization/GDU-Amortization.component';
import { CrearAmortizacreateAmortizationComponent } from './Components/Amortizacion/Create-Amortization/Create-Amortization.component';
import { CrearAccountComponent } from './Components/Account/Create-Account/Create-Account.component';

import { CreateLoansComponent } from './Components/Loan/Create-Loan/Create-Loan.component';
import { CreatewarrantyComponent } from './Components/warranty/create-warranty/Create-warranty.component';
import { GDUwarrantyComponent } from './Components/warranty/Get-Delete-Update-warranty/GDU-warranty.component';
import { UpdateAccountComponent } from './Components/Account/Update-Account/Update-Account.component';
import { updateLoanComponent } from './Components/Loan/Update-Loan/Update-Loan.component';
import { updateUserComponent } from './Components/User/update-user/update-user.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: "User",
        component: MostrarUserComponent
    },
    {
        path: "User/new",
        component: CrearUserComponent
    },
    {
        path: "User/update/:id",
        component: updateUserComponent
    },
    {
        path: "Accounts",
        component: GetDeleteAccountsComponent
    },
    {
        path: "Accounts/new",
        component: CrearAccountComponent
    },
    {
        path: "Accounts/update/:id",
        component: UpdateAccountComponent
    },
    {
        path: "Loan",
        component: GetDeleteLoansComponent
    },
    {
        path: "Loan/new",
        component: CreateLoansComponent
    },
    {
        path: "Loan/update/:id",
        component: updateLoanComponent
    },
    {
        path: "Amortization",
        component: GDUAmortizationComponent
    },
    {
        path: "Amortization/new",
        component: CrearAmortizacreateAmortizationComponent
    },
    {
        path: "warranty",
        component: GDUwarrantyComponent
    },
    {
        path: "warranty/new",
        component: CreatewarrantyComponent
    }

];
