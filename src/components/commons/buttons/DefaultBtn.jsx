import styled from 'styled-components';

const DefaultBtn = ({ title, type, fill, disabled, onClick }) => {
    return (
        <Button type={type} fill={fill} disabled={disabled} onClick={onClick}>
            {title}
        </Button>
    );
};

export default DefaultBtn;

const Button = styled.div`
    display: block;
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    border-radius: 4px;
    background-color: ${({ fill }) => (fill ? '#5429FF' : '#fff')};
    color: ${({ fill }) => (fill ? '#fff' : '#5429FF')};
    cursor: pointer;
`;
