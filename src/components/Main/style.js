import styled from 'styled-components';
import { Container } from '../../commons/styles/style';

export const MainContainer = styled(Container)`
    width: 1200px;
    padding: 100px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .MuiTableCell-root {
        overflow-y: auto;
        div {
            height: 50px;
        }
    }

    .MuiTableCell-root:nth-child(1) {
        text-align: center;
    }
`;

export const Title = styled.h2`
    font-size: 42px;
    font-weight: 500;
    color: #111;
    text-align: center;
    margin-bottom: 15px;
`;

export const SubTitle = styled.p`
    font-size: 22px;
    font-weight: 400;
    color: #111;
    text-align: center;
    margin-bottom: 20px;
`;

export const InnputBox = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:last-child) {
        margin-bottom: 15px;
    }
`;

export const Input = styled.input`
    width: 80%;
    padding: 15px;
    border: none;
    outline: none;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 400;
    color: #999;

    &:focus {
        border: 1px solid #9c39ff;
    }
`;

export const Button = styled.button`
    display: block;
    width: 15%;
    height: 55px;
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    background-color: ${({ color }) => color};
    border: none;
    outline: none;
    border-radius: 4px;
    cursor: pointer;

    &:active {
        opacity: 0.8;
    }
`;

export const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    margin-top: 50px;
`;

export const LoadingText = styled.p`
    font-size: 20px;
    font-weight: 500;
    color: #111;
    text-align: center;
`;
