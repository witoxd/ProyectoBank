
import { PrestamoController } from "../controllers/prestamos.controllers";
import { Request, Response, Application, Router } from "express";
export class prestamoRoutes {
    prestamocontroller: PrestamoController = new PrestamoController()

    public routes(app: Application): void {
        app.route("/prestamo/test")
             .get(this.prestamocontroller.test);

        app.route("/prestamos").get(this.prestamocontroller.getAllprestamo)
        app.route("/prestamo").post(this.prestamocontroller.createprestamo)

        app.route("/prestamo/:id")
             .get(this.prestamocontroller.getOneprestamo)
             .delete(this.prestamocontroller.deletedeleteprestamo)
             .put(this.prestamocontroller.updateprestamo)
    }
}