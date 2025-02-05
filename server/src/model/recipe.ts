import { Column, DataType, Model, Table} from "sequelize-typescript";
import IRecipe from "../Interface/Recipe";

@Table({
    tableName: "recipes",
    timestamps: false,
})

export default class Recipe extends Model<Recipe> implements IRecipe {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    author!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    link!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    instructions!: string;
}