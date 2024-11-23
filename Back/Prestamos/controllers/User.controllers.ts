import { Request, Response } from "express";
import { User, UserI } from "../models/User";


export class UserController {

    public async test(req: Request, res:Response){
        try {
            res.send('Prueba test User')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllUser(req: Request, res:Response){
        try {
            const Users: UserI[] = await User.findAll() // select * from Users;
            res.status(200).json({Users})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneUser(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const Users:UserI | null = await User.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (Users){
                res.status(200).json(Users)
            } else return  res.status(300).json({msg: "the user don't exist"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
            
        }
    }

    public async createUser(req: Request, res:Response){
        const {
            id,
            name,
            email,
            adress,
            phone,
            password,
            is_active,
            avatar
        } = req.body;

        try {
            let body:UserI = {
                name,
                email,
                adress,
                phone,
                password,
                is_active,
                avatar
            } 

            const Users:UserI = await User.create({...body});
            return res.status(200).json({Users});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updateUser(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            name,
            email,
            adress,
            phone,
            password,
            is_active,
            avatar
        }= req.body

        try {
            let body:UserI = {
                name,
                email,
                adress,
                phone,
                password,
                is_active,
                avatar
            } 

            const UserExist: UserI | null = await User.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!UserExist) return res.status(500).json({msg:"the user don't exist"})
            await User.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const Users: UserI | null = await User.findByPk(pk);
        if(Users) return res.status(200).json({Users})

    }

    public async deletedeleteUser(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const UserExist: UserI | null = await User.findByPk(pk);
            if(!UserExist) return res.status(500).json({msg:"the user don't exist"})
            await User.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Delete User"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 


}