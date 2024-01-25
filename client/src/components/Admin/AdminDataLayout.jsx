import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import SubTitle from '../commons/titles/SubTitle';
import SecondTitle from '../commons/titles/SecondTitle';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { PiDownloadSimpleBold } from 'react-icons/pi';

const AdminDataLayout = () => {
    return (
        <Wrapper>
            <S.AdminContainer>
                <SubTitle title="관리자 - 질의 데이터 관리" />
                <S.SecondTitleContainer>
                    <SecondTitle title="백엔드에 갱신된 질의 데이터를 업로드하거나, 현재 사용되고 있는 최신 질의 데이터를 다운로드 할 수 있습니다." />
                </S.SecondTitleContainer>
                <S.DataBtnBox>
                    <S.DataBtn color="#fff" style={{ fontSize: '20px' }}>
                        <span>다운로드</span>
                        <PiDownloadSimpleBold />
                    </S.DataBtn>
                    <S.DataBtn color="#1565c0" style={{ fontSize: '20px' }}>
                        <span>업로드</span>
                        <PiUploadSimpleBold color="#fff" />
                    </S.DataBtn>
                </S.DataBtnBox>
            </S.AdminContainer>
        </Wrapper>
    );
};

export default AdminDataLayout;
