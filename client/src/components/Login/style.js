import styled from 'styled-components';

export const LoginContainer = styled.div`
    width: 400px;
    margin: 100px auto;
`;

export const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 15px;
`;

export const BtnContainer = styled.div`
    width: 100%;
`;

export const KakaoLogin = styled.button`
    display: flex;
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: #f7e600;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #3a1d1d;
    margin: 10px 0;
`;

export const GoogleLogin = styled.button`
    display: flex;
    width: 100%;
    height: 40px;
    border: 1px solid #ddd;
    outline: none;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #111;
    margin: 10px 0;
`;

export const LinkText = styled.p`
    font-size: 14px;
    font-weight: 400;
    color: #111;
    margin-top: 20px;
    a {
        font-weight: 500;
        color: #5429ff;
    }
`;
