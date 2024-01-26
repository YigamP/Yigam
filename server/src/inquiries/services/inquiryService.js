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
}

export { InquiryService };
