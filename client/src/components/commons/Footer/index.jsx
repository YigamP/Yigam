import { Container } from '../../../commons/styles/style';
import * as S from './style';

const Footer = () => {
    return (
        <S.FooterWrap>
            <Container>
                <S.FooterContents>
                    <S.FooterLogoContainer>
                        <img src="/assets/logo.png" alt="로고 이미지" />
                    </S.FooterLogoContainer>
                    <p>
                        (주)이감 / 대표자: 김봉소 / 사업자등록번호: 120-87-85755 /
                        통신판매업신고번호: 제 2018-서울서초-1781 / 개인정보관리자: 이상엽
                    </p>
                    <p>서울특별시 서초구 강남대로 16길 3 (양재디에스타워, 구 아산벤처타워) 3층</p>
                    <p>Copyright © (주)이감. All Rights Reserved.</p>
                </S.FooterContents>
            </Container>
        </S.FooterWrap>
    );
};

export default Footer;
