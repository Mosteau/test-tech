import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// ici on exporte le schema Task en document mongoose 
export type TaskDocument = HydratedDocument<Task>;

// Configuration du schéma avec options
// timestamps: true -> gère automatiquement createdAt/updatedAt
@Schema({ 
    timestamps: true,
    toJSON: {
        // doc: le document Mongoose original
        // ret: l'objet JavaScript retourné (qu'on peut modifier)
        // on renomme __id en id pour l'api rest et Front qui attend id
        transform: (doc, ret) => {
            (ret as any).id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})
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