import { BelongsTo, Column, DataType, Model, Table} from "sequelize-typescript";
import IIngredient from "../Interface/Ingredient";
import Recipe from "./recipe";

@Table({
    tableName: "ingredients",
    timestamps: false,
})

export default class Ingredient extends Model<Ingredient> implements IIngredient {
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
        type: DataType.ARRAY(DataType.INTEGER),
        allowNull: true
    })
    recipe_ids!: [];

    @BelongsTo(() => Recipe, "recipe_ids") recipe!: Recipe;
}