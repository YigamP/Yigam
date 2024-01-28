import { Router } from 'express';
import { InquiryController } from '../controllers/inquiryController.js';

const InquiryRouter = Router();

InquiryRouter.get('/', InquiryController.getInquires);
InquiryRouter.post('/', InquiryController.reqInquires);
InquiryRouter.get('/all', InquiryController.getAllInquires);
InquiryRouter.post('/', InquiryController.reqInquires);

export { InquiryRouter };
