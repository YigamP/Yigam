import { useState } from 'react';
import * as S from './style';
import * as API from '../../api/index';
import Swal from 'sweetalert2';

const UserList = ({ user, index, page, setRefetch }) => {
    const [role, setRole] = useState(user?.role);

    const handleChangeRole = async e => {
        setRole(e.target.value);
        try {
            await API.patch('/users/role', { userId: user.id, role: e.target.value });
            Swal.fire({
                title: '알림',
                text: '유저 권한이 변경 되었습니다.',
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

    const handleUserDelete = async () => {
        try {
            const confirm = window.confirm('해당 유저가 탈퇴 됩니다.');

            if (confirm) {
                await API.patch('/users/delete', { userId: user.id });
                setRefetch(prev => prev + 1);
                Swal.fire({
                    title: '알림',
                    text: '탈퇴 처리 하였습니다.',
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
        <S.ListOfLists key={user?.id}>
            <S.SmallBox style={{ textAlign: 'center' }}>{index + 1 + (page - 1) * 10}</S.SmallBox>
            <S.ReportProfile>
                <S.MediumBox>{user?.email}</S.MediumBox>
            </S.ReportProfile>
            <S.boxContainer>{user?.nickname}</S.boxContainer>
            <S.boxContainer style={{ textAlign: 'center' }}>
                {user?.type === 'normal' ? '일반' : user?.type === 'google' ? '구글' : '카카오'}
            </S.boxContainer>
            <S.SmallBox>
                <S.IdHandleSelect
                    onChange={handleChangeRole}
                    // value={role || user?.role === 'user' ? 'user' : 'admin'}
                    value={role}
                >
                    <option value="user">유저</option>
                    <option value="admin">관리자</option>
                </S.IdHandleSelect>
            </S.SmallBox>
            <S.SmallBox>
                <S.Button onClick={handleUserDelete}>탈퇴</S.Button>
            </S.SmallBox>
        </S.ListOfLists>
    );
};

export default UserList;
