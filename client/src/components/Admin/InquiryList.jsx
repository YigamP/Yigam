import { useState } from 'react';
import * as S from './style';
import * as API from '../../api/index';
import Swal from 'sweetalert2';

const InquiryList = ({ inquiry, index, page, setRefetch }) => {
    const [status, setStatus] = useState(inquiry.status);

    const handleChangeStatus = async e => {
        setStatus(e.target.value);
        try {
            await API.patch('/inquiries/status', { inquiryId: inquiry.id, status: e.target.value });
            Swal.fire({
                title: '알림',
                text: '문의 상태가 변경 되었습니다.',
                button: 'OK'
            });
        } catch (err) {
            Swal.fire({
                title: '알림',
                text: '오류가 발생하였습니다.',
                icon: 'error',
                button: 'OK'
            });
        }
    };

    const handleInquiryDelete = async () => {
        try {
            const confirm = window.confirm('해당 문의내역이 삭제 됩니다.');

            if (confirm) {
                await API.patch('/inquiries/delete', { inquiryId: inquiry.id });
                setRefetch(prev => prev + 1);
                Swal.fire({
                    title: '알림',
                    text: '해당 문의내역이 삭제 되었습니다.',
                    button: 'OK'
                });
            }
        } catch (err) {
            Swal.fire({
                title: '알림',
                text: '오류가 발생하였습니다.',
                icon: 'error',
                button: 'OK'
            });
        }
    };

    return (
        <S.ListOfLists key={index}>
            <S.SmallBox style={{ textAlign: 'center' }}>{index + 1 + (page - 1) * 10}</S.SmallBox>
            <S.SmallBox style={{ textAlign: 'center' }}>
                {inquiry?.created_at.slice(0, 10)}
            </S.SmallBox>
            <S.ReportProfile>
                <S.MediumBox>{inquiry?.user_email}</S.MediumBox>
            </S.ReportProfile>
            <S.LargeBox>
                <S.ScrollContainer>
                    <S.ScrollText>{inquiry?.inquiry_content}</S.ScrollText>
                </S.ScrollContainer>
            </S.LargeBox>

            <S.SmallBox>
                <S.IdHandleSelect
                    onChange={handleChangeStatus}
                    disabled={inquiry?.status === 'complete'}
                    value={status}
                >
                    <option value="wait">대기</option>
                    <option value="complete">완료</option>
                </S.IdHandleSelect>
            </S.SmallBox>
            <S.SmallBox>
                <S.Button onClick={handleInquiryDelete}>삭제</S.Button>
            </S.SmallBox>
        </S.ListOfLists>
    );
};

export default InquiryList;
