import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import SubTitle from '../commons/titles/SubTitle';

const AdminInquiryLayout = () => {
    return (
        <Wrapper>
            <S.AdminContainer>
                <SubTitle title="관리자 - 검색내역" />
                <S.ListHead style={{ padding: '0' }}>
                    <S.SmallBox style={{ textAlign: 'center' }}>No.</S.SmallBox>
                    <S.SmallBox>닉네임</S.SmallBox>
                    <S.boxContainer>이메일</S.boxContainer>
                    <S.BigLargeBox>
                        <S.ScrollContainer>검색내용</S.ScrollContainer>
                    </S.BigLargeBox>
                    <S.SmallBox style={{ textAlign: 'center' }}>검색시간</S.SmallBox>
                </S.ListHead>
                {new Array(11).fill().map((_el, index) => (
                    <S.ListOfLists style={{ padding: '0' }} key={index}>
                        <S.SmallBox style={{ textAlign: 'center' }}>{index + 1}</S.SmallBox>
                        <S.SmallBox>닉네임</S.SmallBox>
                        <S.boxContainer>이메일</S.boxContainer>
                        <S.BigLargeBox>
                            <S.ScrollContainer>
                                <S.ScrollText>검색내용</S.ScrollText>
                            </S.ScrollContainer>
                        </S.BigLargeBox>
                        <S.SmallBox style={{ textAlign: 'center' }}>검색시간</S.SmallBox>
                    </S.ListOfLists>
                ))}
            </S.AdminContainer>
        </Wrapper>
    );
};

export default AdminInquiryLayout;
