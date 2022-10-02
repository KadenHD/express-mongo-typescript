import mongoose, { Document, Schema } from 'mongoose';
import Book from './Book';

export interface IAuthor {
    name: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, require: true }
    },
    {
        timestamps: true
    }
)
    .pre('save', function (next) {
        this.increment();
        next();
    })
    .post('remove', function () {
        Book.deleteMany({ author: this._id }).exec();
    });

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
