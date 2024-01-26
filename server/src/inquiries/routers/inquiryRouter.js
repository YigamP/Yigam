import { Router } from 'express';
import { InquiryController } from '../controllers/inquiryController.js';

const InquiryRouter = Router();

InquiryRouter.get('/', InquiryController.getInquires);

export { InquiryRouter };
