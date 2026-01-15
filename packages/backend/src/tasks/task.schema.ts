import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// ici on exporte le schema Task en document mongoose 
export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true }) //timestamps va gérer automatiquement createdAt/updatedAt
export class Task {
    // le @Prop()Le décorateur définit une propriété dans le document
    @Prop({ required: true }) // champs obligatoires
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({
        required: true,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    })
    status: string;

    @Prop({
        required: true,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    })
    priority: string;

    @Prop({ type: [String], default: [] }) // les tableaux type string
    tags: string[];
}

// exporte la classe en schema Mongoose à partir de la classe définie ci-dessus
export const TaskSchema = SchemaFactory.createForClass(Task);