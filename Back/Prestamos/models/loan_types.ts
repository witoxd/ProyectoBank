import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TypeLoan extends Model {
    public type!: string;
    public description!: string;
}
export interface TypeLoanI {
    type: string;
    description: string;
}

TypeLoan.init({
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "TypeLoan",
    sequelize: database,
    timestamps: false
});
