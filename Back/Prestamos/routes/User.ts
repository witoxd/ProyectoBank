import { UserController } from "../controllers/User.controllers";
import { Request, Response, Application, Router } from "express";
import { authMiddleware } from "../middleware/auth";
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

//---------------------------------------------

             app.route("/User2/test")
             .get(this.UserController.test);

        app.route("/Users2").get(authMiddleware, this.UserController.getAllUser)
        app.route("/User2").post(authMiddleware ,this.UserController.createUser)

        app.route("/User2/:id")
             .get(authMiddleware, this.UserController.getOneUser)
             .delete(authMiddleware, this.UserController.deletedeleteUser)
             .put(authMiddleware, this.UserController.updateUser)
    }
}