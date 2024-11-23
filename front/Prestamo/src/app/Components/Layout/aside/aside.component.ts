import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  items: MenuItem[] = [];


  ngOnInit(): void {
    this.items = [
      {
        label: 'User',
        icon: 'pi pi-fw pi-users',
        color: 'blue',
        routerLink: '/User',
      },
      {
        label: 'Account',
        icon: 'pi pi-fw pi-users',
        routerLink: '/Accounts'
      },
      // {
      //   label: 'Empresarios',
      //   icon: 'pi pi-fw pi-qrcode',
      //   items: [
      //     {
      //       label: 'Sucursales',
      //       icon: 'pi pi-fw pi-building',
      //       items: [
      //         {
      //           label: 'Mostrar',
      //           routerLink: '/Sucursales'
      //         },
      //         {
      //           label: 'Crear',
      //           routerLink: '/sucursales/nuevo'
      //         }
      //       ]
      //     },
      //     {
      //       label: 'Mostrar',
      //       routerLink: '/Empleados'

      //     },
      //     {
      //       label: 'Crear',
      //       // routerLink: '/Empleados/nuevo'
      //     }
      //   ]
      // },
      {
        label: 'Loan',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink: '/Loan'
      },
      {
        label: 'Amortization',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink: '/Amortization'
      },
      {
        label: 'warranty',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink: '/warranty'

      },
    ];
  }
}
