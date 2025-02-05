import { BelongsTo, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import IMeal_History from "../Interface/Meal_History";
import Recipe from "./recipe";

@Table({
    tableName: "meal history",
    timestamps: false,
})

export default class Meal_History extends Model<Meal_History> implements IMeal_History {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id!: number;

    @Column({
        type: DataType.ARRAY(DataType.NUMBER),
        allowNull: true
    })
    recipe_ids!: [];

    @BelongsTo(() => Recipe, "recipe_id") recipe!: Recipe;
}