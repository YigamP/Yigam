import { Link } from 'react-router-dom';
import * as S from './style';
import { useRecoilState } from 'recoil';
import { refetchState, userState } from '../../../atoms';
import { useEffect } from 'react';
import * as API from '../../../api/index';

const Header = () => {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [refetch, setRefetch] = useRecoilState(refetchState);

    useEffect(() => {
        const getUser = async () => {
            const result = await API.get('/users/my');
            setUserInfo(result.data.user);
        };

        getUser();
    }, [refetch]);

    useEffect(() => {
        const cookieToken = document.cookie
            .split(';')
            .map(cookie => cookie.trim())
            .find(cookie => cookie.startsWith('token='));

        if (cookieToken) {
            const tokenValue = cookieToken.split('=')[1];

            sessionStorage.setItem('token', tokenValue);
            setRefetch(prev => prev + 1);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload();
    };
    return (
        <S.HeaderBox>
            <S.HeaderContainer>
                <S.LogoContainer>
                    <Link to={'/'}>
                        <img src="/assets/logo.png" alt="로고 이미지" />
                    </Link>
                </S.LogoContainer>
                <S.Navigation>
                    <ul>
                        {sessionStorage.getItem('token') ? (
                            <>
                                <li>
                                    <Link to="/">QA 검색</Link>
                                </li>
                                {userInfo.role === 'admin' && (
                                    <>
                                        <li>
                                            <Link to="/admin">유저관리</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/inquiry">문의내역</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/search_history">검색내역</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/data">질의 데이터 관리</Link>
                                        </li>
                                    </>
                                )}

                                <li>
                                    <Link onClick={handleLogout}>로그아웃</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">로그인</Link>
                                </li>
                                <li>
                                    <Link to="/join">회원가입</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </S.Navigation>
            </S.HeaderContainer>
        </S.HeaderBox>
    );
};

export default Header;
