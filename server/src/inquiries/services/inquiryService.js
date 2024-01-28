import { InquiryRepository } from '../repositories/inquiryRepository.js';

class InquiryService {
    static async getInquiries({ page, pageSize }) {
        const skip = (page - 1) * pageSize;
        try {
            const inquires = await InquiryRepository.getInquiries({ pageSize, skip });

            const totalInquiryConut = await InquiryRepository.getTotalInquiries();

            const totalPages = Math.ceil(totalInquiryConut / pageSize);

            return { inquires, totalPages };
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getAllInquiries() {
        try {
            const inquires = await InquiryRepository.getAllInquiries();

            return inquires;
        } catch (err) {
            throw new Error(err);
        }
    }

    static async reqInquires({ content, email }) {
        try {
            const result = await InquiryRepository.addInquires({ content, email });

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    static async changeStatus({ inquiryId, status }) {
        try {
            await InquiryRepository.changeStatus({ inquiryId, status });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async deleteInquiry({ inquiryId }) {
        try {
            await InquiryRepository.deleteInquiry({ inquiryId });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { InquiryService };
