
import { AmortizationController } from "../controllers/amortization.controllers";
import { Request, Response, Application, Router } from "express";
export class AmortizationRoutes {
    AmortizationController: AmortizationController = new AmortizationController()

    public routes(app: Application): void {
        app.route("/Amortization/test")
             .get(this.AmortizationController.test);

        app.route("/Amortizations").get(this.AmortizationController.getAllAmortization)
        app.route("/Amortization").post(this.AmortizationController.createAmortization)

        app.route("/Amortization/:id")
             .get(this.AmortizationController.getOneAmortization)
             .delete(this.AmortizationController.deletedeleteAmortization)
             .put(this.AmortizationController.updateAmortization)
    }
}