import { Request, Response } from "express";
import { Loan, LoanI } from "../models/loan";
import { Amortization, AmortizationI } from "../models/amortization";
import { warranty, warrantyI } from "../models/warranty";
export class LoanController {

    public async test(req: Request, res: Response) {
        try {
            res.send('Pruba de test para Loan')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllLoan(req: Request, res: Response) {
        try {
            const Loans: LoanI[] = await Loan.findAll() // select * from Loans;
            res.status(200).json({ Loans })
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneLoan(req: Request, res: Response) {
        const { id: idParam } = req.params

        try {
            const Loans: LoanI | null = await Loan.findOne(
                {
                    where: {
                        id: idParam,
                    }
                }
            )
            if (Loans) {
                res.status(200).json(Loans)
            } else return res.status(300).json({ msg: "there is no loan" })

        } catch (error) {
            res.status(500).json({ msg: "Error Internal" })
        }
    }

    public async createLoan(req: Request, res: Response) {
        const {
            id,
            UserID,
            date_loan,
            type_loanID,
            amount_loan,
            interests,
            state
        } = req.body;
    
        try {
            // Crear el préstamo
            let Body: LoanI = {
                id,
                UserID,
                date_loan,
                type_loanID,
                amount_loan,
                interests,
                state
            };
    
            const newLoan: Loan = await Loan.create({ ...Body });
    
            // Generar las amortizaciones
            const numCuotas = 3; // Número de cuotas (por ejemplo, 3 meses)
            const montoCuota = amount_loan / numCuotas; // Monto por cuota (división simple)
            const startDate = new Date(date_loan); // Fecha inicial del préstamo
            const amortizations: AmortizationI[] = []; // Array para almacenar las amortizaciones creadas
    
    
            for (let i = 1; i <= numCuotas; i++) {
                const dueDate = new Date(startDate); // Clonar la fecha inicial
                dueDate.setMonth(startDate.getMonth() + i); // Incrementar la fecha por cada mes
    
                const LoanID = newLoan.id;
                const date = dueDate;
                const amount = montoCuota;
                const state = false;

                let bodyII: AmortizationI = {
                    LoanID,
                    date,
                    amount,
                    state
                };
    
                await Amortization.create({ ...bodyII });
            }
    
            // Crear todas las amortizaciones en la base de datos
   
    
            // Responder con los datos creados
            return res.status(200).json({
                loan: newLoan
            });
        } catch (error) {
            console.error("Error creating loan and amortizations:", error);
            res.status(500).json({ error });
        }
    }
    
    public async updateLoan(req: Request, res: Response) {
        const { id: pk } = req.params;

        const {
            id,
            UserID,
            // empleadoID,
            date_loan,
            type_loanID,
            amount_loan,
            interests,
            state
        } = req.body

        try {
            let body: LoanI = {
                id,
                UserID,
                // empleadoID,
                date_loan,
                type_loanID,
                amount_loan,
                interests,
                state
            }

            const LoanExist: LoanI | null = await Loan.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if (!LoanExist) return res.status(500).json({ msg: "there is no loan" })
            await Loan.update(
                body, {
                where: { id: pk }
            }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const Loans: LoanI | null = await Loan.findByPk(pk);
        if (Loans) return res.status(200).json({ Loans })

    }

    public async deletedeleteLoan(req: Request, res: Response) {
        const { id: pk } = req.params;

        try {
            const AmortizationExist: AmortizationI | null = await Amortization.findByPk(pk);
            const LoanExist: LoanI | null = await Loan.findByPk(pk);
            if (!LoanExist) return res.status(500).json({ msg: "there is no loan" })
                const warrantyExist: AmortizationI | null = await Amortization.findByPk(pk);

            if (!warrantyExist){
                await warranty.destroy(
                    {
                        where: { LoanID: pk }
                    }
                )
            }
            if (!AmortizationExist){
                await Amortization.destroy(
                    {
                        where: { LoanID: pk }
                    }
                )
            }
            await Loan.destroy(
                {
                    where: { id: pk }
                }
            )
            res.status(200).json({ msg: "Loan removed" })
        } catch (error) {
            res.status(500).json({ error });
        }

    }


}