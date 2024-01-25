import styled from 'styled-components';

export const HeaderBox = styled.div`
    width: 100%;
    padding: 40px 0;
`;

export const HeaderContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const LogoContainer = styled.div`
    width: 150px;

    img {
        width: 100%;
    }
`;

export const Navigation = styled.nav`
    ul {
        display: flex;
        gap: 20px;
        li {
            a {
                font-size: 18px;
                font-weight: 400;
                color: #111;

                &:hover {
                    color: #9c39ff;
                }
            }
        }
    }
`;
