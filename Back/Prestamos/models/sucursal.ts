// import { Sequelize, Model, DataTypes } from "sequelize";
// import { database } from "../database/db";

// export class Sucursal extends Model {

//     public nombre!: string;
//     public telefono!: number;
//     public direccion!: string;
// }

// export interface SucursalI {
//     nombre: string;
//     telefono: number;
//     direccion: string;
// }

// Sucursal.init({

//     nombre: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     telefono: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     direccion: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     tableName: "Sucursal",
//     sequelize: database,
//     timestamps: false
// });
