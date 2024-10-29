// import { personaRoutes } from "./persona";
import { clienteRoutes } from "./cliente";
// import { empleadoRoutes } from "./empleado";
// import { sucursalRoutes } from "./sucursal";
import { cuentaRoutes } from "./cuenta";
import { prestamoRoutes } from "./prestamo";
import { amortizacionRoutes } from "./amortizacion";
import { garantiaRoutes } from "./garantia";
import { TipoCuentaRoutes } from "./TipoCuenta";
import { TipoPrestamoRoutes } from "./TipoPrestamo";


export class Routes {
    // personaRoutes: personaRoutes = new personaRoutes()
    clienteRoutes: clienteRoutes = new clienteRoutes()
    // empleadoRoutes: empleadoRoutes = new empleadoRoutes()
    // sucursalRoutes: sucursalRoutes = new sucursalRoutes()
    TipoCuentaRoutes: TipoCuentaRoutes = new TipoCuentaRoutes()
    cuentaRoutes: cuentaRoutes = new cuentaRoutes()
    prestamoRoutes: prestamoRoutes = new prestamoRoutes()
    amortizacionRoutes: amortizacionRoutes = new amortizacionRoutes()
    garantiaRoutes: garantiaRoutes = new garantiaRoutes()
    TipoPrestamoRoutes: TipoPrestamoRoutes = new TipoPrestamoRoutes()

}