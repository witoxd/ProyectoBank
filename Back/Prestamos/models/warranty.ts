import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Loan } from "./loan";
export class warranty extends Model {
    public LoanID!: number;
    public type_warranty!: string;
    public value_warranty!: number;
    public description!: string;
}

export interface warrantyI {
    LoanID: number;
    type_warranty: string;
    value_warranty: number;
    description: string;
}

warranty.init({
    LoanID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type_warranty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value_warranty: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "warranty",
    sequelize: database,
    timestamps: false
});
warranty.belongsTo(Loan,{foreignKey:"LoanID"})