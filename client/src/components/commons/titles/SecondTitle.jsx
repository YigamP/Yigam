import styled from 'styled-components';

const SecondTitle = ({ title }) => {
    return <Title>{title}</Title>;
};

export default SecondTitle;

const Title = styled.h3`
    font-size: 17px;
    font-weight: 400;
    color: #444;
`;
