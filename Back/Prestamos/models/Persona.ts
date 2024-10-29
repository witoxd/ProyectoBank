// import { Sequelize, Model, DataTypes } from "sequelize";
// import { database } from "../database/db";

// export class Persona extends Model {
//     public nombre!: string;
//     public apellido!: string;
//     public direccion!: string;
//     public correo!: string;
//     public telefono!: number;
// }

// export interface PersonaI{

//     nombre: string;
//     apellido: string;
//     direccion: string;
//     correo: string;
//     telefono: number;

// }

// Persona.init({
//     nombre: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     apellido: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     direccion: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     correo: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     telefono: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// }, {
//     tableName: "Persona",
//     sequelize: database,
//     timestamps: false
// });
