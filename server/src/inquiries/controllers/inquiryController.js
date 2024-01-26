import { InquiryService } from '../services/inquiryService.js';

class InquiryController {
    static async getInquires(req, res) {
        try {
            const inquires = await InquiryService.getInquiries();
            res.json(inquires);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { InquiryController };
