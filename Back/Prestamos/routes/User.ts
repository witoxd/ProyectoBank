import { UserController } from "../controllers/User.controllers";
import { Request, Response, Application, Router } from "express";
export class UserRoutes {
    UserController: UserController = new UserController()

    public routes(app: Application): void {
        app.route("/User/test")
             .get(this.UserController.test);

        app.route("/Users").get(this.UserController.getAllUser)
        app.route("/User").post(this.UserController.createUser)

        app.route("/User/:id")
             .get(this.UserController.getOneUser)
             .delete(this.UserController.deletedeleteUser)
             .put(this.UserController.updateUser)
    }
}