import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import SubTitle from '../commons/titles/SubTitle';
import SecondTitle from '../commons/titles/SecondTitle';
import * as API from '../../api/index.js';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { scrollToTop } from '../../commons/util/index.js';

const AdminLayout = () => {
    const [userData, setUserData] = useState([]);
    const [page, setPage] = useState(1);

    const handleChangePage = (_e, page) => {
        scrollToTop();
        setPage(page);
    };

    useEffect(() => {
        const getUsers = async () => {
            const { data } = await API.get(`/users?page=${page}`);
            setUserData(data);
        };
        getUsers();
    }, [page]);

    return (
        <Wrapper>
            <S.AdminContainer>
                <SubTitle title="관리자 - 유저관리" />
                <S.SecondTitleContainer>
                    <SecondTitle title="유저 정보 조회 및 권한, 탈퇴 처리가 가능합니다." />
                </S.SecondTitleContainer>
                <S.ListHead>
                    <S.SmallBox style={{ textAlign: 'center' }}>No.</S.SmallBox>
                    <S.LargeBox style={{ paddingLeft: '10px' }}>이메일</S.LargeBox>
                    <S.boxContainer>닉네임</S.boxContainer>
                    <S.boxContainer style={{ textAlign: 'center' }}>로그인 타입</S.boxContainer>
                    <S.SmallBox style={{ textAlign: 'center' }}>권한</S.SmallBox>
                    <S.SmallBox></S.SmallBox>
                </S.ListHead>
                {userData?.users?.map((user, index) => (
                    <S.ListOfLists key={index}>
                        <S.SmallBox style={{ textAlign: 'center' }}>
                            {index + 1 + (page - 1) * 10}
                        </S.SmallBox>
                        <S.ReportProfile>
                            <S.MediumBox>{user?.email}</S.MediumBox>
                        </S.ReportProfile>
                        <S.boxContainer>{user?.nickname}</S.boxContainer>
                        <S.boxContainer style={{ textAlign: 'center' }}>
                            {user?.type === 'normal'
                                ? '일반'
                                : user?.type === 'google'
                                  ? '구글'
                                  : '카카오'}
                        </S.boxContainer>
                        <S.SmallBox>
                            <S.IdHandleSelect
                                onChange={() => {}}
                                value={user?.role === 'user' ? 'user' : 'admin'}
                            >
                                <option value="user">유저</option>
                                <option value="admin">관리자</option>
                            </S.IdHandleSelect>
                        </S.SmallBox>
                        <S.SmallBox>
                            <S.Button>탈퇴</S.Button>
                        </S.SmallBox>
                    </S.ListOfLists>
                ))}
                <S.PaginationContainer>
                    <Stack spacing={2}>
                        <Pagination
                            defaultValue={1}
                            page={page}
                            count={userData?.totalPages}
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

export default AdminLayout;
