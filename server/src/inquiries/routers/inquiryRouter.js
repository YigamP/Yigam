import { Router } from 'express';
import { InquiryController } from '../controllers/inquiryController.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const InquiryRouter = Router();

InquiryRouter.get('/', InquiryController.getInquires);
InquiryRouter.post('/', verifyToken, InquiryController.reqInquires);
InquiryRouter.get('/all', InquiryController.getAllInquires);
InquiryRouter.patch('/status', InquiryController.changeStatus);
InquiryRouter.patch('/delete', InquiryController.deleteInquiry);

export { InquiryRouter };
