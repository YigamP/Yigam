import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import SubTitle from '../commons/titles/SubTitle';
import SecondTitle from '../commons/titles/SecondTitle';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import * as API from '../../api/index.js';
import { scrollToTop } from '../../commons/util/index.js';
import { Pagination, Stack } from '@mui/material';

const AdminSearchHistoryLayout = () => {
    const [searchData, setSearchData] = useState([]);
    const [searchDataAll, setSearchDataAll] = useState([]);
    const [page, setPage] = useState(1);

    const handleChangePage = (_e, page) => {
        scrollToTop();
        setPage(page);
    };

    const handleDownload = () => {
        if (!window.confirm('검색 기록을 전체 다운로드 합니다.')) {
            return;
        }
        const csvRows = [
            ['No.', '유저 이메일', '유저 닉네임', '검색기록', '검색시간'], // headers
            ...searchDataAll.map(row => [
                row.id,
                row.user_email,
                row.nickname,
                row.search_history,
                row.created_at
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
        const getUsers = async () => {
            const { data } = await API.get(`/searches?page=${page}`);
            setSearchData(data);
        };
        getUsers();
    }, [page]);

    useEffect(() => {
        const getAllInquiry = async () => {
            const { data } = await API.get('/searches/all');
            const formattedRows = data.map(search => ({
                id: search.id,
                user_email: search.user_email,
                nickname: search.nickname,
                search_history: search.search,
                created_at: search.created_at
            }));
            setSearchDataAll(formattedRows);
        };
        getAllInquiry();
    }, []);

    return (
        <Wrapper>
            <S.AdminContainer>
                <S.BetweenBox>
                    <SubTitle title="관리자 - 검색내역" />
                    <S.DataBtn color="#fff" style={{ fontSize: '20px' }} onClick={handleDownload}>
                        <span>엑셀 다운로드</span>
                        <PiDownloadSimpleBold />
                    </S.DataBtn>
                </S.BetweenBox>
                <S.SecondTitleContainer>
                    <SecondTitle title="회원들이 검색한 내역을 조회할 수 있습니다." />
                </S.SecondTitleContainer>
                <S.ListHead style={{ padding: '0' }}>
                    <S.SmallBox style={{ textAlign: 'center' }}>No.</S.SmallBox>
                    <S.SmallBox>닉네임</S.SmallBox>
                    <S.boxContainer>이메일</S.boxContainer>
                    <S.BigLargeBox>
                        <S.ScrollContainer>검색내용</S.ScrollContainer>
                    </S.BigLargeBox>
                    <S.SmallBox style={{ textAlign: 'center' }}>검색시간</S.SmallBox>
                </S.ListHead>
                {searchData?.searches?.map((search, index) => (
                    <S.ListOfLists style={{ padding: '0' }} key={index}>
                        <S.SmallBox style={{ textAlign: 'center' }}>
                            {index + 1 + (page - 1) * 10}
                        </S.SmallBox>
                        <S.SmallBox>{search?.nickname}</S.SmallBox>
                        <S.boxContainer>{search?.user_email}</S.boxContainer>
                        <S.BigLargeBox>
                            <S.ScrollContainer>
                                <S.ScrollText>{search?.search}</S.ScrollText>
                            </S.ScrollContainer>
                        </S.BigLargeBox>
                        <S.SmallBox style={{ textAlign: 'center' }}>
                            {search?.created_at.slice(0, 10)}
                        </S.SmallBox>
                    </S.ListOfLists>
                ))}
                <S.PaginationContainer>
                    <Stack spacing={2}>
                        <Pagination
                            defaultValue={1}
                            page={page}
                            count={searchData?.totalPages}
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

export default AdminSearchHistoryLayout;
