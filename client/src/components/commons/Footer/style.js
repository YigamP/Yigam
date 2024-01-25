import styled from 'styled-components';
import { Wrapper } from '../../../commons/styles/style';

export const FooterWrap = styled(Wrapper)`
    background: rgb(34, 34, 34);
    padding: 30px 0;
`;

export const FooterLogoContainer = styled.div`
    width: 200px;
    margin-bottom: 20px;

    img {
        width: 100%;
    }
`;

export const FooterContents = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        font-size: 15px;
        font-weight: 400;
        color: #fff;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
`;
