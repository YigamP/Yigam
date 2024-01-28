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
        const { content } = req.body;
        const email = req.email;
        try {
            const result = await InquiryService.reqInquires({ content, email });
            if (result) {
                res.json({ message: '문의가 성공적으로 접수 되었습니다.' });
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    static async changeStatus(req, res) {
        const { inquiryId, status } = req.body;

        try {
            await InquiryService.changeStatus({ inquiryId, status });

            return res.status(200).json({ message: '문의 상태가 변경 되었습니다.' });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async deleteInquiry(req, res) {
        const { inquiryId } = req.body;

        try {
            await InquiryService.deleteInquiry({ inquiryId });

            return res.status(200).json({ message: '해당 문의내역이 삭제 되었습니다.' });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { InquiryController };
