import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), controller.createBook);
router.get('/get/:bookId', controller.findBook);
router.get('/get', controller.findAllBook);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.create), controller.updateBook);
router.delete('/delete/:bookId', controller.deleteBook);

export = router;
