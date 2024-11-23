import { Request, Response, Application, Router } from "express";
import { TypeLoanController } from "../controllers/Loan_type.controllers";
export class TypeLoanRoutes {
    TypeLoanController: TypeLoanController = new TypeLoanController();

    public routes(app: Application): void {

        app.route("/TypeLoans").get(this.TypeLoanController.getAllTypeLoan)
        app.route("/TypeLoan").post(this.TypeLoanController.createTypeLoan)

        app.route("/TypeLoan/:id")
            .get(this.TypeLoanController.getOneTypeLoan)
            .delete(this.TypeLoanController.deleteTypeLoan)
            .put(this.TypeLoanController.updateTypeLoan)
    }
}