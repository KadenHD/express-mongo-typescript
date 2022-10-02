import mongoose, { Document, Schema } from 'mongoose';
import idValidator from 'mongoose-id-validator';

export interface IBook {
    title: string;
    author: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, require: true },
        author: { type: Schema.Types.ObjectId, require: true, ref: 'Author' }
    },
    {
        timestamps: true
    }
)
    .pre('save', function (next) {
        this.increment();
        next();
    })
    .plugin(idValidator);

export default mongoose.model<IBookModel>('Book', BookSchema);
