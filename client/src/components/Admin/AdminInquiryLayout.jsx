import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import SubTitle from '../commons/titles/SubTitle';
import SecondTitle from '../commons/titles/SecondTitle';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import * as API from '../../api/index.js';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../commons/util';
import { Pagination, Stack } from '@mui/material';

const AdminInquiryLayout = () => {
    const [inquiryData, setInquiryData] = useState([]);
    const [inquiryAll, setInquiryAll] = useState([]);
    const [page, setPage] = useState(1);

    const handleChangePage = (_e, page) => {
        scrollToTop();
        setPage(page);
    };

    const handleDownload = () => {
        if (!window.confirm('문의내역을 전체 다운로드 합니다.')) {
            return;
        }
        const csvRows = [
            ['No.', '문의시간', '유저 이메일', '문의내용', '상태'], // headers
            ...inquiryAll.map(row => [
                row.id,
                row.created_at,
                row.user_email,
                row.content,
                row.status
            ]) // data
        ];

        const csvContent = '\uFEFF' + csvRows.map(e => e.join(',')).join('\n'); // Add BOM

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'inquiries.csv');
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "inquiries.csv".

        document.body.removeChild(link); // Clean up
        URL.revokeObjectURL(url); // Free up storage--no longer needed.
    };

    useEffect(() => {
        const getInquiries = async () => {
            const { data } = await API.get(`/inquiries?page=${page}`);
            setInquiryData(data);
        };
        getInquiries();
    }, [page]);

    useEffect(() => {
        const getAllInquiry = async () => {
            const { data } = await API.get('/inquiries/all');
            const formattedRows = data.map(inquiry => ({
                id: inquiry.id,
                user_email: inquiry.user_email,
                content: inquiry.inquiry_content,
                status: inquiry.status === 'wait' ? '대기' : '완료',
                created_at: inquiry.created_at
            }));
            setInquiryAll(formattedRows);
        };
        getAllInquiry();
    }, []);

    return (
        <Wrapper>
            <S.AdminContainer>
                <S.BetweenBox>
                    <SubTitle title="관리자 - 문의내역" />
                    <S.DataBtn color="#fff" style={{ fontSize: '20px' }} onClick={handleDownload}>
                        <span>엑셀 다운로드</span>
                        <PiDownloadSimpleBold />
                    </S.DataBtn>
                </S.BetweenBox>
                <S.SecondTitleContainer>
                    <SecondTitle title="회원들이 문의한 내용을 확인하고, csv 형식으로 내려 받을 수 있습니다" />
                </S.SecondTitleContainer>
                <S.ListHead>
                    <S.SmallBox style={{ textAlign: 'center' }}>No.</S.SmallBox>
                    <S.SmallBox style={{ textAlign: 'center' }}>문의날짜</S.SmallBox>
                    <S.LargeBox style={{ paddingLeft: '10px' }}>문의자 이메일</S.LargeBox>
                    <S.LargeBox>문의내용</S.LargeBox>

                    <S.SmallBox style={{ textAlign: 'center' }}>상태</S.SmallBox>
                    <S.SmallBox></S.SmallBox>
                </S.ListHead>
                {inquiryData?.inquires?.map((inquiry, index) => (
                    <S.ListOfLists key={index}>
                        <S.SmallBox style={{ textAlign: 'center' }}>
                            {index + 1 + (page - 1) * 10}
                        </S.SmallBox>
                        <S.SmallBox style={{ textAlign: 'center' }}>
                            {inquiry?.created_at.slice(0, 10)}
                        </S.SmallBox>
                        <S.ReportProfile>
                            <S.MediumBox>{inquiry?.user_email}</S.MediumBox>
                        </S.ReportProfile>
                        <S.LargeBox>
                            <S.ScrollContainer>
                                <S.ScrollText>{inquiry?.inquiry_content}</S.ScrollText>
                            </S.ScrollContainer>
                        </S.LargeBox>

                        <S.SmallBox>
                            <S.IdHandleSelect
                                onChange={() => {}}
                                disabled={inquiry?.status === 'complete'}
                                value={inquiry?.status === 'wait' ? 'wait' : 'complete'}
                            >
                                <option value="wait">대기</option>
                                <option value="complete">완료</option>
                            </S.IdHandleSelect>
                        </S.SmallBox>
                        <S.SmallBox>
                            <S.Button>삭제</S.Button>
                        </S.SmallBox>
                    </S.ListOfLists>
                ))}
                <S.PaginationContainer>
                    <Stack spacing={2}>
                        <Pagination
                            defaultValue={1}
                            page={page}
                            count={inquiryData?.totalPages}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChangePage}
                        />
                    </Stack>
                </S.PaginationContainer>
            </S.AdminContainer>
        </Wrapper>
    );
};

export default AdminInquiryLayout;
