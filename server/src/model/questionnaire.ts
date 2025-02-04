import { Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import IQuestionnaire from "../Interface/Questionnaire";
import Answer from "./answers";

@Table({
    tableName: "questionnaire",
    timestamps: false,
})

export default class Questionnaire extends Model<Questionnaire> implements IQuestionnaire {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    question!: string;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        allowNull: false,
    })
    answer_ids!: [{}]

    @HasMany(() => Answer, "answer_ids") answer!: Answer;
}