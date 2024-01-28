import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class InquiryRepository {
    static async getInquiries({ pageSize, skip }) {
        try {
            return await prisma.inquiry.findMany({
                where: {
                    deleted_at: null
                },
                orderBy: {
                    created_at: 'desc'
                },
                skip,
                take: pageSize
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getTotalInquiries() {
        try {
            return await prisma.inquiry.count();
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getAllInquiries() {
        try {
            return await prisma.inquiry.findMany();
        } catch (err) {
            throw new Error(err);
        }
    }

    static async addInquires({ content, email }) {
        try {
            return await prisma.inquiry.create({
                data: {
                    user_email: email,
                    inquiry_content: content,
                    status: 'wait',
                    created_at: new Date()
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async changeStatus({ inquiryId, status }) {
        try {
            return await prisma.inquiry.update({
                where: {
                    id: inquiryId
                },
                data: {
                    status: status
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async deleteInquiry({ inquiryId }) {
        try {
            return await prisma.inquiry.update({
                where: {
                    id: inquiryId
                },
                data: {
                    deleted_at: new Date()
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { InquiryRepository };
