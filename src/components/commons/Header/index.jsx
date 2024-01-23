import { Link } from 'react-router-dom';
import * as S from './style';

const Header = () => {
    return (
        <S.HeaderBox>
            <S.HeaderContainer>
                <S.LogoContainer>
                    <Link to={'/'}>
                        <img src="/assets/logo.png" alt="로고 이미지" />
                    </Link>
                </S.LogoContainer>
            </S.HeaderContainer>
        </S.HeaderBox>
    );
};

export default Header;
