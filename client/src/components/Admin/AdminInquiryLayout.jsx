import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import SubTitle from '../commons/titles/SubTitle';
import SecondTitle from '../commons/titles/SecondTitle';

const AdminInquiryLayout = () => {
    return (
        <Wrapper>
            <S.AdminContainer>
                <SubTitle title="관리자 - 문의내역" />
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
                {new Array(11).fill().map((_el, index) => (
                    <S.ListOfLists key={index}>
                        <S.SmallBox style={{ textAlign: 'center' }}>{index + 1}</S.SmallBox>
                        <S.ReportProfile>
                            <S.MediumBox>이메일</S.MediumBox>
                        </S.ReportProfile>
                        <S.boxContainer>누의내용</S.boxContainer>
                        <S.boxContainer style={{ textAlign: 'center' }}>2020.01.01</S.boxContainer>
                        <S.SmallBox>
                            <S.IdHandleSelect>
                                <option value="">대기</option>
                                <option value="">완료</option>
                            </S.IdHandleSelect>
                        </S.SmallBox>
                        <S.SmallBox>
                            <S.Button>삭제</S.Button>
                        </S.SmallBox>
                    </S.ListOfLists>
                ))}
            </S.AdminContainer>
        </Wrapper>
    );
};

export default AdminInquiryLayout;
