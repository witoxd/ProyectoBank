
import { warrantyController } from "../controllers/warranty.controllers";
import { Request, Response, Application, Router } from "express";
export class warrantyRoutes {
    warrantyController: warrantyController = new warrantyController()

    public routes(app: Application): void {
        app.route("/warranty/test")
             .get(this.warrantyController.test);

        app.route("/warrantys").get(this.warrantyController.getAllwarranty)
        app.route("/warranty").post(this.warrantyController.createwarranty)

        app.route("/warranty/:id")
             .get(this.warrantyController.getOnewarranty)
             .delete(this.warrantyController.deletedeletewarranty)
             .put(this.warrantyController.updatewarranty)
    }
}