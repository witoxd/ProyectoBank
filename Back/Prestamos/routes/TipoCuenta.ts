import { TipoCuentaController } from "../controllers/TipoCuenta.controllers";
import { Request, Response, Application, Router } from "express";

export class TipoCuentaRoutes {
    tipoCuentaController: TipoCuentaController = new TipoCuentaController();

    public routes(app: Application): void {

        app.route("/TipoCuentas").get(this.tipoCuentaController.getAllTipoCuenta)
        app.route("/TipoCuenta").post(this.tipoCuentaController.createTipoCuenta)

        app.route("/TipoCuenta/:id")
            .get(this.tipoCuentaController.getOneTipoCuenta)
            .delete(this.tipoCuentaController.deleteTipoCuenta)
            .put(this.tipoCuentaController.updateTipoCuenta)
    }
}