
import { GarantiaController } from "../controllers/garantia.controllers";
import { Request, Response, Application, Router } from "express";
export class garantiaRoutes {
    garantiacontroller: GarantiaController = new GarantiaController()

    public routes(app: Application): void {
        app.route("/garantia/test")
             .get(this.garantiacontroller.test);

        app.route("/garantias").get(this.garantiacontroller.getAllgarantia)
        app.route("/garantia").post(this.garantiacontroller.creategarantia)

        app.route("/garantia/:id")
             .get(this.garantiacontroller.getOnegarantia)
             .delete(this.garantiacontroller.deletedeletegarantia)
             .put(this.garantiacontroller.updategarantia)
    }
}