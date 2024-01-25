import * as S from './style';
import { Container, Wrapper } from '../../commons/styles/style';
import TextInput from '../commons/inputs/TextInput';
import SubTitle from '../commons/titles/SubTitle';
import DefaultBtn from '../commons/buttons/DefaultBtn';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const LoginLayout = () => {
    return (
        <Wrapper>
            <Container>
                <S.LoginContainer>
                    <S.TitleContainer>
                        <SubTitle title="로그인" />
                    </S.TitleContainer>
                    <S.InputContainer>
                        <TextInput title="이메일" helperText="이메일을 입력해주세요." />
                    </S.InputContainer>
                    <S.InputContainer>
                        <TextInput type="password" title="비밀번호" />
                    </S.InputContainer>
                    <S.BtnContainer>
                        <DefaultBtn title="로그인" fill type="button" />
                    </S.BtnContainer>
                    <S.KakaoLogin>
                        <RiKakaoTalkFill size={25} />
                        <span>카카오톡 로그인</span>
                    </S.KakaoLogin>
                    <S.GoogleLogin>
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
