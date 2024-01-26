import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import SubTitle from '../commons/titles/SubTitle';
import SecondTitle from '../commons/titles/SecondTitle';
import { PiDownloadSimpleBold } from 'react-icons/pi';

const AdminSearchHistoryLayout = () => {
    return (
        <Wrapper>
            <S.AdminContainer>
                <S.BetweenBox>
                    <SubTitle title="관리자 - 검색내역" />
                    <S.DataBtn color="#fff" style={{ fontSize: '20px' }}>
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

export default AdminSearchHistoryLayout;
