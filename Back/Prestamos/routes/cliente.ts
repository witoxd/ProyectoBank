import { ClienteController } from "../controllers/cliente.controllers";
import { Request, Response, Application, Router } from "express";
export class clienteRoutes {
    clienteController: ClienteController = new ClienteController()

    public routes(app: Application): void {
        app.route("/cliente/test")
             .get(this.clienteController.test);

        app.route("/clientes").get(this.clienteController.getAllcliente)
        app.route("/cliente").post(this.clienteController.createCliente)

        app.route("/cliente/:id")
             .get(this.clienteController.getOneCliente)
             .delete(this.clienteController.deletedeletecliente)
             .put(this.clienteController.updateCliente)
    }
}