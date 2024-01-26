import { InquiryRepository } from '../repositories/inquiryRepository.js';

class InquiryService {
    static async getInquiries() {
        try {
            const inquires = await InquiryRepository.getInquiries();

            return inquires;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { InquiryService };
