// import { Request, Response } from "express";
// import { Persona, PersonaI } from "../models/Persona";


// export class PersonaController {

//     public async test(req: Request, res:Response){
//         try {
//             res.send('Pruba de test para persona')
//         } catch (error) {
//             res.status(500).json({ error });
//         }
//     }

//     public async getAllPersona(req: Request, res:Response){
//         try {
//             const Personas: PersonaI[] = await Persona.findAll() // select * from clientes;
//             res.status(200).json({Personas})
//         } catch (error) {
//             res.status(500).json({ error });
//         }
//     }

//     public async getOnePersona(req: Request, res:Response){
//         const { id: idParam } = req.params

//         try {
//             const Personas:PersonaI | null = await Persona.findOne(
//                 {
//                     where: { 
//                         id: idParam,
//                     }
//                 }
//             )
//             if (Personas){
//                return res.status(200).json(Personas)
//             } else return  res.status(300).json({msg: "No existe la persona"})

//         } catch (error) {
//             res.status(500).json({msg: "Error Internal"})
//         }
//     }

//     public async createPersona(req: Request, res:Response){
//         const {
//             nombre,
//             apellido, 
//             direccion, 
//             correo, 
//             telefono
//         } = req.body;

//         try {
//             let body:PersonaI = {
//                 nombre, 
//                 apellido, 
//                 direccion, 
//                 correo, 
//                 telefono
//             } 

//             const Personas:PersonaI = await Persona.create({...body});
//             return res.status(200).json({Personas});

//         } catch (error) {
//             res.status(500).json({ error });
//         }

//     }

//     public async updatePersona(req: Request, res:Response){
//         const { id:pk } = req.params;

//         const {
//             id,
//             nombre,
//             apellido, 
//             direccion, 
//             correo, 
//             telefono
//         }= req.body

//         try {
//             let body:PersonaI = {
//                 nombre,
//                 apellido, 
//                 direccion, 
//                 correo, 
//                 telefono
//             } 

//             const personaExist: PersonaI | null = await Persona.findByPk(pk);
//             // const userExist: UsuarioI | null = await Usuario.findOne(
//             //     {
//             //         where: { id: pk}
//             //     }
//             // );

//             if(!personaExist) return res.status(500).json({msg:"El tipo de producto No existe"})
//             await Persona.update(
//                 body,{
//                     where: {id:pk}
//                 }
//             );  // select update from usuarios where id=pk



//         } catch (error) {
//             res.status(500).json({ error });
//         }
//         const Personas: PersonaI | null = await Persona.findByPk(pk);
//         if(Personas) return res.status(200).json({Personas})

//     }

//     public async deletedeletePersona(req: Request, res:Response){
//         const { id:pk } = req.params;


//         try {
//             const personaExist: PersonaI | null = await Persona.findByPk(pk);
//             if(!personaExist) return res.status(500).json({msg:"El Cliente No existe"})
//             await Persona.destroy(
//                 {
//                     where: {id: pk}
//                 }
//             )
//             res.status(200).json({msg:"Persona Eliminado"})
//         } catch (error) {
//             res.status(500).json({ error });
//         }

//     } 


// }
