import { TypeAccountController } from "../controllers/Type_Account.controllers";
import { Request, Response, Application, Router } from "express";

export class TypeAccountRoutes {
    TypeAccountController: TypeAccountController = new TypeAccountController();

    public routes(app: Application): void {

        app.route("/TypeAccounts").get(this.TypeAccountController.getAllTypeAccount)
        app.route("/TypeAccount").post(this.TypeAccountController.createTypeAccount)

        app.route("/TypeAccount/:id")
            .get(this.TypeAccountController.getOneTypeAccount)
            .delete(this.TypeAccountController.deleteTypeAccount)
            .put(this.TypeAccountController.updateTypeAccount)
    }
}