import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import SubTitle from '../commons/titles/SubTitle';
import SecondTitle from '../commons/titles/SecondTitle';
import { PiUploadSimpleBold } from 'react-icons/pi';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminDataLayout = () => {
    const handleChangeFile = async e => {
        const file = e.target.files[0];
        const serverUrl = `http://${window.location.hostname}:5000/searches/upload`;
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const result = await axios.post(serverUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                Swal.fire({
                    title: '알림',
                    text: result.data.message,
                    button: 'OK'
                });
            } catch (err) {
                Swal.fire({
                    title: '알림',
                    text: err.response.data.error,
                    icon: 'error',
                    button: 'OK'
                });
            }
        }
    };

    const downloadFile = () => {
        // 서버 URL 설정
        const serverURL = `http://${window.location.hostname}:5000/searches/download`;

        // Axios를 사용하여 서버에 GET 요청을 보냄
        axios({
            method: 'get',
            url: serverURL,
            responseType: 'blob' // 응답 데이터 형식을 'blob'으로 설정
        })
            .then(response => {
                // Blob을 이용하여 다운로드 링크 생성
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const a = document.createElement('a');
                a.href = url;
                a.download = '답변합본.xlsx'; // 다운로드될 파일의 이름 설정
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('There has been a problem with your axios operation:', error);
            });
    };

    return (
        <Wrapper>
            <S.AdminContainer>
                <SubTitle title="관리자 - 질의 데이터 관리" />
                <S.SecondTitleContainer>
                    <SecondTitle title="백엔드에 갱신된 질의 데이터를 업로드하거나, 현재 사용되고 있는 최신 질의 데이터를 다운로드 할 수 있습니다." />
                </S.SecondTitleContainer>
                <S.DataBtnBox>
                    <S.DataBtn color="#fff" style={{ fontSize: '20px' }} onClick={downloadFile}>
                        <span>다운로드</span>
                        <PiDownloadSimpleBold />
                    </S.DataBtn>
                    <input
                        type="file"
                        id="file"
                        style={{ display: 'none' }}
                        onChange={handleChangeFile}
                    />
                    <S.fileLabel htmlFor="file" color="#1565c0" style={{ fontSize: '20px' }}>
                        <span>업로드</span>
                        <PiUploadSimpleBold color="#fff" />
                    </S.fileLabel>
                </S.DataBtnBox>
            </S.AdminContainer>
        </Wrapper>
    );
};

export default AdminDataLayout;
