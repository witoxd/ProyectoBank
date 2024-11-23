
import { LoanController } from "../controllers/Loan.controllers";
import { Request, Response, Application, Router } from "express";
export class LoanRoutes {
    LoanController: LoanController = new LoanController()

    public routes(app: Application): void {
        app.route("/Loan/test")
             .get(this.LoanController.test);

        app.route("/Loans").get(this.LoanController.getAllLoan)
        app.route("/Loan").post(this.LoanController.createLoan)

        app.route("/Loan/:id")
             .get(this.LoanController.getOneLoan)
             .delete(this.LoanController.deletedeleteLoan)
             .put(this.LoanController.updateLoan)
    }
}