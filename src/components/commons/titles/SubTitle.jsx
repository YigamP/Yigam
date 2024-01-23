import styled from 'styled-components';

const SubTitle = ({ title }) => {
    return <Title>{title}</Title>;
};

export default SubTitle;

const Title = styled.h2`
    font-size: 32px;
    font-weight: 600;
    color: #111;
    margin-bottom: 40px;
`;
