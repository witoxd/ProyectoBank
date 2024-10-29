
import { AmortizacionController } from "../controllers/amortizacion.controllers";
import { Request, Response, Application, Router } from "express";
export class amortizacionRoutes {
    amortizacioncontroller: AmortizacionController = new AmortizacionController()

    public routes(app: Application): void {
        app.route("/amortizacion/test")
             .get(this.amortizacioncontroller.test);

        app.route("/amortizaciones").get(this.amortizacioncontroller.getAllamortizacion)
        app.route("/amortizacion").post(this.amortizacioncontroller.createamortizacion)

        app.route("/amortizacion/:id")
             .get(this.amortizacioncontroller.getOneamortizacion)
             .delete(this.amortizacioncontroller.deletedeleteamortizacion)
             .put(this.amortizacioncontroller.updateamortizacion)
    }
}