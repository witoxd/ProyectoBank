// import { Request, Response } from "express";
// import { Empleado, EmpleadoI } from "../models/empleado";


// export class EmpleadoController {

//     public async test(req: Request, res:Response){
//         try {
//             res.send('Pruba de test para empleado')
//         } catch (error) {
//             res.status(500).json({ error });
//         }
//     }

//     public async getAllempleado(req: Request, res:Response){
//         try {
//             const Empleados: EmpleadoI[] = await Empleado.findAll() // select * from empleados;
//             res.status(200).json({Empleados})
//         } catch (error) {
//             res.status(500).json({ error });
//         }
//     }

//     public async getOneempleado(req: Request, res:Response){
//         const { id: idParam } = req.params

//         try {
//             const Empleados:EmpleadoI | null = await Empleado.findOne(
//                 {
//                     where: { 
//                         id: idParam,
//                     }
//                 }
//             )
//             if (Empleados){
//                 res.status(200).json(Empleados)
//             } else return  res.status(300).json({msg: "No existe la empleado"})

//         } catch (error) {
//             res.status(500).json({msg: "Error Internal"})
//         }
//     }

//     public async createempleado(req: Request, res:Response){
//         const {
//             id,
//             cargo,
//             nombre,
//             apellido,
//             direccion,
//             correo,
//             telefono,
//             sucursalID
//         } = req.body;

//         try {
//             let body:EmpleadoI = {
//                 cargo,
//                 nombre,
//                 apellido,
//                 direccion,
//                 correo,
//                 telefono,
//                 sucursalID
//             } 

//             const empleados:EmpleadoI = await Empleado.create({...body});
//             return res.status(200).json({empleados});

//         } catch (error) {
//             res.status(500).json({ error });
//         }

//     }

//     public async updateempleado(req: Request, res:Response){
//         const { id:pk } = req.params;

//         const {
//             id,
//             cargo,
//             nombre,
//             apellido,
//             direccion,
//             correo,
//             telefono,
//             sucursalID
//         }= req.body

//         try {
//             let body:EmpleadoI = {
//                 cargo,
//                 nombre,
//                 apellido,
//                 direccion,
//                 correo,
//                 telefono,
//                 sucursalID
//             } 

//             const empleadoExist: EmpleadoI | null = await Empleado.findByPk(pk);
//             // const userExist: UsuarioI | null = await Usuario.findOne(
//             //     {
//             //         where: { id: pk}
//             //     }
//             // );

//             if(!empleadoExist) return res.status(500).json({msg:"El empleado No existe"})
//             await Empleado.update(
//                 body,{
//                     where: {id:pk}
//                 }
//             );  // select update from usuarios where id=pk



//         } catch (error) {
//             res.status(500).json({ error });
//         }
//         const empleados: EmpleadoI | null = await Empleado.findByPk(pk);
//         if(empleados) return res.status(200).json({empleados})

//     }

//     public async deletedeleteempleado(req: Request, res:Response){
//         const { id:pk } = req.params;


//         try {
//             const empleadoExist: EmpleadoI | null = await Empleado.findByPk(pk);
//             if(!empleadoExist) return res.status(500).json({msg:"El empleado No existe"})
//             await Empleado.destroy(
//                 {
//                     where: {id: pk}
//                 }
//             )
//             res.status(200).json({msg:"empleado Eliminado"})
//         } catch (error) {
//             res.status(500).json({ error });
//         }

//     } 


// }