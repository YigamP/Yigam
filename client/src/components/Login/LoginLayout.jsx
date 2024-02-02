import * as S from './style';
import { Container, Wrapper } from '../../commons/styles/style';
import TextInput from '../commons/inputs/TextInput';
import SubTitle from '../commons/titles/SubTitle';
import DefaultBtn from '../commons/buttons/DefaultBtn';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import * as API from '../../api/index';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms';

const LoginLayout = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setUserInfo] = useRecoilState(userState);

    const navigation = useNavigate();

    const handleChangeInput = e => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleLogin = async () => {
        if (email && password) {
            try {
                const result = await API.post('/users/login', { email, password });
                sessionStorage.setItem('token', result.data.token);
                setUserInfo(result.data.user);
                Swal.fire({
                    title: '알림',
                    text: '로그인 성공',
                    button: 'OK'
                });
                navigation('/');
            } catch (err) {
                Swal.fire({
                    title: '알림',
                    text: err.response.data.error,
                    icon: 'error',
                    button: 'OK'
                });
            }
        } else {
            Swal.fire({
                title: '알림',
                text: '빈칸을 모두 입력해주세요.',
                icon: 'error',
                button: 'OK'
            });
        }
    };

    const handleGoogleLogin = () => {
        window.location.assign(`${API.serverUrl}/auth/google`);
    };

    return (
        <Wrapper>
            <Container>
                <S.LoginContainer>
                    <S.TitleContainer>
                        <SubTitle title="로그인" />
                    </S.TitleContainer>
                    <S.InputContainer>
                        <TextInput
                            title="이메일"
                            name="email"
                            helperText="이메일을 입력해주세요."
                            onChange={handleChangeInput}
                        />
                    </S.InputContainer>
                    <S.InputContainer>
                        <TextInput
                            type="password"
                            name="password"
                            title="비밀번호"
                            onChange={handleChangeInput}
                        />
                    </S.InputContainer>
                    <S.BtnContainer>
                        <DefaultBtn title="로그인" fill type="button" onClick={handleLogin} />
                    </S.BtnContainer>
                    <S.KakaoLogin>
                        <RiKakaoTalkFill size={25} />
                        <span>카카오톡 로그인</span>
                    </S.KakaoLogin>
                    <S.GoogleLogin onClick={handleGoogleLogin}>
                        <FcGoogle size={25} />
                        <span>구글 로그인</span>
                    </S.GoogleLogin>
                    <S.LinkText>
                        회원이 아니시라구요? <Link to="/join">회원가입 하러가기</Link>
                    </S.LinkText>
                </S.LoginContainer>
            </Container>
        </Wrapper>
    );
};

export default LoginLayout;
