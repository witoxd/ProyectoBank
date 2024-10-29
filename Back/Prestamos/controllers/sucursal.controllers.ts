// import { Request, Response } from "express";
// import { Sucursal, SucursalI } from "../models/sucursal";


// export class SucursalController {

//     public async test(req: Request, res:Response){
//         try {
//             res.send('Pruba de test para sucursal')
//         } catch (error) {
//             res.status(500).json({ error });
//         }
//     }

//     public async getAllsucursal(req: Request, res:Response){
//         try {
//             const Sucursales: SucursalI[] = await Sucursal.findAll() // select * from sucursals;
//             res.status(200).json({Sucursales})
//         } catch (error) {
//             res.status(500).json({ error });
//         }
//     }

//     public async getOnesucursal(req: Request, res:Response){
//         const { id: idParam } = req.params

//         try {
//             const Sucursales:SucursalI | null = await Sucursal.findOne(
//                 {
//                     where: { 
//                         id: idParam,
//                     }
//                 }
//             )
//             if (Sucursales){
//                 res.status(200).json(Sucursales)
//             } else return  res.status(300).json({msg: "No existe la sucursal"})

//         } catch (error) {
//             res.status(500).json({msg: "Error Internal"})
//         }
//     }

//     public async createsucursal(req: Request, res:Response){
//         const {
//             id,
//             nombre,
//             telefono,
//             direccion
//         } = req.body;

//         try {
//             let body:SucursalI = {
//                 nombre,
//                 telefono,
//                 direccion
//             } 

//             const sucursals:SucursalI = await Sucursal.create({...body});
//             return res.status(200).json({sucursals});

//         } catch (error) {
//             res.status(500).json({ error });
//         }

//     }

//     public async updatesucursal(req: Request, res:Response){
//         const { id:pk } = req.params;

//         const {
//             id,
//             nombre,
//             telefono,
//             direccion
//         }= req.body

//         try {
//             let body:SucursalI = {
//                 nombre,
//                 telefono,
//                 direccion
//             } 

//             const sucursalExist: SucursalI | null = await Sucursal.findByPk(pk);
//             // const userExist: UsuarioI | null = await Usuario.findOne(
//             //     {
//             //         where: { id: pk}
//             //     }
//             // );

//             if(!sucursalExist) return res.status(500).json({msg:"El sucursal No existe"})
//             await Sucursal.update(
//                 body,{
//                     where: {id:pk}
//                 }
//             );  // select update from usuarios where id=pk



//         } catch (error) {
//             res.status(500).json({ error });
//         }
//         const sucursals: SucursalI | null = await Sucursal.findByPk(pk);
//         if(sucursals) return res.status(200).json({sucursals})

//     }

//     public async deletedeletesucursal(req: Request, res:Response){
//         const { id:pk } = req.params;


//         try {
//             const sucursalExist: SucursalI | null = await Sucursal.findByPk(pk);
//             if(!sucursalExist) return res.status(500).json({msg:"El sucursal No existe"})
//             await Sucursal.destroy(
//                 {
//                     where: {id: pk}
//                 }
//             )
//             res.status(200).json({msg:"sucursal Eliminado"})
//         } catch (error) {
//             res.status(500).json({ error });
//         }

//     } 


// }