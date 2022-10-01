import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor {
    name: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
).pre('save', function (next) {
    this.increment();
    next();
});

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
