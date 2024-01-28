import { InquiryService } from '../services/inquiryService.js';

class InquiryController {
    static async getInquires(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;

        try {
            const { inquires, totalPages } = await InquiryService.getInquiries({ page, pageSize });
            res.json({ inquires, currentPage: page, totalPages });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getAllInquires(req, res) {
        try {
            const inquires = await InquiryService.getAllInquiries();
            res.json(inquires);
        } catch (err) {
            throw new Error(err);
        }
    }

    static async reqInquires(req, res) {
        const { title } = req.body;
        try {
            const result = await InquiryService.reqInquires({ title });
            res.json(result);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { InquiryController };
