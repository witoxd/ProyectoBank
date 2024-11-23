import { AccountController } from "../controllers/Account.controllers";
import { Request, Response, Application, Router } from "express";
export class AccountRoutes {
    AccountController: AccountController = new AccountController()

    public routes(app: Application): void {
        app.route("/Account/test")
             .get(this.AccountController.test);

        app.route("/Accounts").get(this.AccountController.getAllAccount)
        app.route("/Account").post(this.AccountController.createAccount)

        app.route("/Account/:id")
             .get(this.AccountController.getOneAccount)
             .delete(this.AccountController.deletedeleteAccount)
             .put(this.AccountController.updateAccount)
    }
}