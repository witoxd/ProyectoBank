import { CuentaController } from "../controllers/cuenta.controllers";
import { Request, Response, Application, Router } from "express";
export class cuentaRoutes {
    cuentacontroller: CuentaController = new CuentaController()

    public routes(app: Application): void {
        app.route("/cuenta/test")
             .get(this.cuentacontroller.test);

        app.route("/cuentas").get(this.cuentacontroller.getAllcuenta)
        app.route("/cuenta").post(this.cuentacontroller.createcuenta)

        app.route("/cuenta/:id")
             .get(this.cuentacontroller.getOnecuenta)
             .delete(this.cuentacontroller.deletedeletecuenta)
             .put(this.cuentacontroller.updatecuenta)
    }
}