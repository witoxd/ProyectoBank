import { Request, Response, Application, Router } from "express";
import { TipoPrestamoController } from "../controllers/TipoPrestamo.controllers";
export class TipoPrestamoRoutes {
    TipoPrestamoController: TipoPrestamoController = new TipoPrestamoController();

    public routes(app: Application): void {

        app.route("/TipoPrestamos").get(this.TipoPrestamoController.getAllTipoPrestamo)
        app.route("/TipoPrestamo").post(this.TipoPrestamoController.createTipoPrestamo)

        app.route("/TipoPrestamo/:id")
            .get(this.TipoPrestamoController.getOneTipoPrestamo)
            .delete(this.TipoPrestamoController.deleteTipoPrestamo)
            .put(this.TipoPrestamoController.updateTipoPrestamo)
    }
}