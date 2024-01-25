import styled from 'styled-components';
import { Container } from '../../commons/styles/style';

export const AdminContainer = styled(Container)`
    padding: 100px 0;
`;

export const ListOfLists = styled.div`
    width: 100%;
    padding-left: 2%;
    display: flex;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid #e7e7e7;
    padding: 2.3rem 0;

    p {
        font-size: 16px;
    }

    &:hover {
        background-color: #d6d5d5;
    }
`;

export const ReportProfile = styled.div`
    width: 30%;
    display: flex;
`;

export const MediumBox = styled.p`
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #252733;
`;
//-------------------------------------
export const SmallBox = styled.div`
    width: 10%;
`;

export const boxContainer = styled.div`
    width: 20%;
`;

export const LargeBox = styled.div`
    width: 30%;
`;

export const IdHandleSelect = styled.select`
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 400;
    color: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    outline: none;
`;
export const StatusChangeBtn = styled.button`
    width: 60%;
    padding: 0.7rem;
    background-color: #4e2bf5;
    border-radius: 30px;
    color: white;
    border: none;
    cursor: pointer;
`;

export const Button = styled.button`
    display: block;
    margin: 0 auto;
    border: none;
    background: none;
    padding: 10px 15px;
    border-radius: 4px;
    background-color: #f00;
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
`;

export const ListHead = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
`;
