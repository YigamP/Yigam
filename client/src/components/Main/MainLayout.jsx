import { CircularProgress } from '@mui/material';
import { Wrapper } from '../../commons/styles/style';
import * as S from './style';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import * as API from '../../api/index';
import Swal from 'sweetalert2';

const columns = [
    { id: 'number', label: '번호', minWidth: 70 },
    { id: 'question', label: '질문 내용', minWidth: 350 },
    {
        id: 'answer',
        label: '답변내용',
        minWidth: 350
    },
    {
        id: 'percent',
        label: '정확도 ',
        minWidth: 70
    }
];

const MainLayout = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [inquiry, setInquiry] = useState('');

    const handleChangeInquiry = e => {
        setInquiry(e.target.value);
    };

    const handleReqInquiry = async () => {
        try {
            await API.post('/inquiries', { content: inquiry });
            Swal.fire({
                title: '알림',
                text: '문의가 정상적으로 등록 되었습니다.',
                button: 'OK'
            });
            setInquiry('');
        } catch (err) {
            Swal.fire({
                title: '알림',
                text: '문의실패, 관리자에게 문의해주세요.',
                icon: 'error',
                button: 'OK'
            });
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createData = (question, answer, percent) => {
        return { question, answer, percent };
    };

    const rows = [
        createData(
            '5번선지의 아는체하다 는 어떤것끼리 결합한건지 알려주세요',
            '는 관형사형 본용언 + (의존명사 + 하다/싶다) 조용언의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습의 형태로 결합되어있습니다.',
            '90.75'
        ),
        createData(
            '5번선지의 아는체하다 는 어떤것끼리 결합한건지 알려주세요',
            '는 관형사형 본용언 + (의존명사 + 하다/싶다) 보조용언의 형태로 결합되어있습니다.',
            '90.75'
        ),
        createData(
            '5번선지의 아는체하다 는 어떤것끼리 결합한건지 알려주세요',
            '는 관형사형 본용언 + (의존명사 + 하다/싶다) 보조용언의 형태로 결합되어있습니다.',
            '90.75'
        ),
        createData(
            '5번선지의 아는체하다 는 어떤것끼리 결합한건지 알려주세요',
            '는 관형사형 본용언 + (의존명사 + 하다/싶다) 보조용언의 형태로 결합되어있습니다.',
            '90.75'
        ),
        createData(
            '5번선지의 아는체하다 는 어떤것끼리 결합한건지 알려주세요',
            '는 관형사형 본용언 + (의존명사 + 하다/싶다) 보조용언의 형태로 결합되어있습니다.',
            '90.75'
        ),
        createData(
            '5번선지의 아는체하다 는 어떤것끼리 결합한건지 알려주세요',
            '는 관형사형 본용언 + (의존명사 + 하다/싶다) 보조용언의 형태로 결합되어있습니다.',
            '90.75'
        )
    ];

    return (
        <Wrapper>
            <S.MainContainer>
                <S.Title>이감 QA 검색</S.Title>
                <S.SubTitle>이감 교재 Q/A에 대한 답변을 검색하거나 질문하세요.</S.SubTitle>
                <S.InnputBox>
                    <S.Input type="text" placeholder="질문을 입력해주세요." />
                    <S.Button color="#9C39FF ">검색하기</S.Button>
                </S.InnputBox>
                <S.InnputBox>
                    <S.Input
                        type="text"
                        placeholder="원하는 답변을 찾지 못하셨나요? 관리자에게 문의주시면, 빠른 시일 내에 이메일 답변 전달 드리겠습니다."
                        value={inquiry}
                        onChange={handleChangeInquiry}
                    />
                    <S.Button color="#c51162" onClick={handleReqInquiry}>
                        문의하기
                    </S.Button>
                </S.InnputBox>

                <S.LoadingContainer>
                    <CircularProgress color="secondary" />
                    <S.LoadingText>AI 모델이 답변 중입니다. 잠시만 기다려주세요.</S.LoadingText>
                </S.LoadingContainer>

                <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '50px' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={row.number}>
                                                {columns.map(column => {
                                                    const value =
                                                        column.id === 'number'
                                                            ? index + 1
                                                            : row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            <div>{value}</div>
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 30, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </S.MainContainer>
        </Wrapper>
    );
};

export default MainLayout;
