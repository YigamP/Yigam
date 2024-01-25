import { Container, Wrapper } from '../../commons/styles/style';
import TextInput from '../commons/inputs/TextInput';
import SubTitle from '../commons/titles/SubTitle';
import DefaultBtn from '../commons/buttons/DefaultBtn';
import { BtnContainer, InputContainer, LinkText, LoginContainer } from '../Login/style';
import { Link } from 'react-router-dom';

const JoinLayout = () => {
    return (
        <Wrapper>
            <Container>
                <LoginContainer>
                    <SubTitle title="회원가입" />
                    <InputContainer>
                        <TextInput title="이메일" helperText="이메일을 입력해주세요." />
                    </InputContainer>
                    <InputContainer>
                        <TextInput type="password" title="비밀번호" />
                    </InputContainer>
                    <InputContainer>
                        <TextInput type="password" title="비밀번호 확인" />
                    </InputContainer>
                    <InputContainer>
                        <TextInput type="text" title="닉네임" />
                    </InputContainer>
                    <BtnContainer>
                        <DefaultBtn title="회원가입" fill type="button" />
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
