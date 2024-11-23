import { Sequelize, Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TypeAccount extends Model {
    public type!: string;
    public description!: string;
}
export interface TypeAccountI {
    type: string;
    description: string;
}

TypeAccount.init({
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "TypeAccount",
    sequelize: database,
    timestamps: false
});

