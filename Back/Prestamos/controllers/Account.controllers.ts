import { Request, Response } from "express";
import { Account, AccountI } from "../models/account";


export class AccountController {

    public async test(req: Request, res:Response){
        try {
            res.send('Pruba de test para Account')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllAccount(req: Request, res:Response){
        try {
            const Accounts: AccountI[] = await Account.findAll() // select * from Accounts;
            res.status(200).json({Accounts})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneAccount(req: Request, res:Response){
        const { id } = req.params

        try {
            const Accounts:AccountI | null = await Account.findByPk(id)
            if (Accounts){
                res.status(200).json(Accounts)
            } else return  res.status(300).json({msg: "No existe la Account"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createAccount(req: Request, res:Response){
        const {
            id,
            UserID,
            number,
            TypeAccountID,
            current_balance
        } = req.body;

        try {
            let body:AccountI = {
                UserID,
                number,
                TypeAccountID,
                current_balance
            } 

            const Accounts:AccountI = await Account.create({...body});
            return res.status(200).json({Accounts});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updateAccount(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            UserID,
            number,
            TypeAccountID,
            current_balance
        }= req.body

        try {
            let body:AccountI = {
                UserID,
                number,
                TypeAccountID,
                current_balance
            } 

            const AccountExist: AccountI | null = await Account.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!AccountExist) return res.status(500).json({msg:"The Account does not exist"})
            await Account.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const Accounts: AccountI | null = await Account.findByPk(pk);
        if(Accounts) return res.status(200).json({Accounts})

    }

    public async deletedeleteAccount(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const AccountExist: AccountI | null = await Account.findByPk(pk);
            if(!AccountExist) return res.status(500).json({msg:"The Account does not exist"})
            await Account.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Delete Account "})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}