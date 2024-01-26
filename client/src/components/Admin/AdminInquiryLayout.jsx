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
    const [page, setPage] = useState(1);

    const handleChangePage = (_e, page) => {
        scrollToTop();
        setPage(page);
    };

    useEffect(() => {
        const getUsers = async () => {
            const { data } = await API.get(`/inquires?page=${page}`);
            setInquiryData(data);
        };
        getUsers();
    }, [page]);

    return (
        <Wrapper>
            <S.AdminContainer>
                <S.BetweenBox>
                    <SubTitle title="관리자 - 문의내역" />
                    <S.DataBtn color="#fff" style={{ fontSize: '20px' }}>
                        <span>엑셀 다운로드</span>
                        <PiDownloadSimpleBold />
                    </S.DataBtn>
                </S.BetweenBox>
                <S.SecondTitleContainer>
                    <SecondTitle title="회원들이 문의한 내용을 확인하고, csv 형식으로 내려 받을 수 있습니다" />
                </S.SecondTitleContainer>
                <S.ListHead>
                    <S.SmallBox style={{ textAlign: 'center' }}>No.</S.SmallBox>
                    <S.LargeBox style={{ paddingLeft: '10px' }}>문의자 이메일</S.LargeBox>
                    <S.boxContainer>문의내용</S.boxContainer>
                    <S.boxContainer style={{ textAlign: 'center' }}>문의날짜</S.boxContainer>
                    <S.SmallBox style={{ textAlign: 'center' }}>상태</S.SmallBox>
                    <S.SmallBox></S.SmallBox>
                </S.ListHead>
                {inquiryData?.inquires?.map((inquiry, index) => (
                    <S.ListOfLists key={index}>
                        <S.SmallBox style={{ textAlign: 'center' }}>
                            {index + 1 + (page - 1) * 10}
                        </S.SmallBox>
                        <S.ReportProfile>
                            <S.MediumBox>{inquiry?.user_email}</S.MediumBox>
                        </S.ReportProfile>
                        <S.boxContainer>{inquiry?.inquiry_content}</S.boxContainer>
                        <S.boxContainer style={{ textAlign: 'center' }}>
                            {inquiry?.created_at.slice(0, 10)}
                        </S.boxContainer>
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
