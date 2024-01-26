import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class InquiryRepository {
    static async getInquiries() {
        try {
            return await prisma.inquiry.findMany();
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { InquiryRepository };
