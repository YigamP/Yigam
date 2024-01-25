import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import SubTitle from '../commons/titles/SubTitle';
import SecondTitle from '../commons/titles/SecondTitle';

const AdminLayout = () => {
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
                    <S.boxContainer style={{ textAlign: 'center' }}>가입날짜</S.boxContainer>
                    <S.SmallBox style={{ textAlign: 'center' }}>권한</S.SmallBox>
                    <S.SmallBox></S.SmallBox>
                </S.ListHead>
                {new Array(11).fill().map((_el, index) => (
                    <S.ListOfLists key={index}>
                        <S.SmallBox style={{ textAlign: 'center' }}>{index + 1}</S.SmallBox>
                        <S.ReportProfile>
                            <S.MediumBox>이메일</S.MediumBox>
                        </S.ReportProfile>
                        <S.boxContainer>닉네임</S.boxContainer>
                        <S.boxContainer style={{ textAlign: 'center' }}>2020.01.01</S.boxContainer>
                        <S.SmallBox>
                            <S.IdHandleSelect>
                                <option value="">유저</option>
                                <option value="">관리자</option>
                            </S.IdHandleSelect>
                        </S.SmallBox>
                        <S.SmallBox>
                            <S.Button>탈퇴</S.Button>
                        </S.SmallBox>
                    </S.ListOfLists>
                ))}
            </S.AdminContainer>
        </Wrapper>
    );
};

export default AdminLayout;
