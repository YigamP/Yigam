import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, _next) => {
    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

// 서버의 포트 설정
const PORT = 8000; // 포트가 지정되어 있지 않으면 기본값으로 3000을 사용
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;