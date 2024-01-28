import { Container, Wrapper } from '../../commons/styles/style';
import TextInput from '../commons/inputs/TextInput';
import SubTitle from '../commons/titles/SubTitle';
import DefaultBtn from '../commons/buttons/DefaultBtn';
import Swal from 'sweetalert2';
import {
    BtnContainer,
    InputContainer,
    LinkText,
    LoginContainer,
    TitleContainer
} from '../Login/style';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as API from '../../api/index';

const JoinLayout = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPassowordConfirm] = useState('');
    const [nickname, setNickname] = useState('');
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const navigation = useNavigate();

    const validateEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChangeInput = e => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
            if (validateEmail(value)) {
                setIsEmailError(false);
            } else {
                setIsEmailError(true);
            }
        } else if (name === 'password') {
            setPassword(value);
            if (value !== passwordConfirm) {
                setIsPasswordError(true);
            } else {
                setIsPasswordError(false);
            }
        } else if (name === 'passwordConfirm') {
            setPassowordConfirm(value);
            if (value !== password) {
                setIsPasswordError(true);
            } else {
                setIsPasswordError(false);
            }
        } else if (name === 'nickname') {
            setNickname(value);
        }
    };

    const handleJoin = async () => {
        if (email && password && passwordConfirm && nickname) {
            try {
                await API.post('/users', { email, password, nickname });
                Swal.fire({
                    title: '알림',
                    text: '회원가입에 성공하였습니다.',
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

    return (
        <Wrapper>
            <Container>
                <LoginContainer>
                    <TitleContainer>
                        <SubTitle title="회원가입" />
                    </TitleContainer>
                    <InputContainer>
                        <TextInput
                            title="이메일"
                            name="email"
                            helperText="이메일 형식에 맞춰 입력해주세요."
                            onChange={handleChangeInput}
                            error={isEmailError}
                        />
                    </InputContainer>
                    <InputContainer>
                        <TextInput
                            type="password"
                            name="password"
                            title="비밀번호"
                            onChange={handleChangeInput}
                            error={isPasswordError}
                        />
                    </InputContainer>
                    <InputContainer>
                        <TextInput
                            type="password"
                            name="passwordConfirm"
                            title="비밀번호 확인"
                            onChange={handleChangeInput}
                            helperText={'비밀번호가 일치하지 않습니다.'}
                            error={isPasswordError}
                        />
                    </InputContainer>
                    <InputContainer>
                        <TextInput
                            type="text"
                            name="nickname"
                            title="닉네임"
                            onChange={handleChangeInput}
                        />
                    </InputContainer>
                    <BtnContainer>
                        <DefaultBtn title="회원가입" fill type="button" onClick={handleJoin} />
                    </BtnContainer>
                    <LinkText>
                        이미 회원가입을 하셨다구요? <Link to="/login">로그인 하러가기</Link>
                    </LinkText>
                </LoginContainer>
            </Container>
        </Wrapper>
    );
};

export default JoinLayout;
