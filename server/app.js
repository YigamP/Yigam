import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { UserRouter } from './src/users/routers/userRouter.js';
import { InquiryRouter } from './src/inquiries/routers/inquiryRouter.js';
import { SearchRouter } from './src/searches/routers/searchRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import GoogleStrategy from 'passport-google-oauth20';
import KakaoStrategy from 'passport-kakao';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
dotenv.config();

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET,
    SESSION_SECRET
    // eslint-disable-next-line no-undef
} = process.env;

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            domain: ' ', // 프론트엔드와 연결한 도메인으로 설정하면 모든 서브도메인에서 쿠키를 사용할 수 있습니다.
            path: '/', // /로 설정하면 모든 페이지에서 쿠키를 사용할 수 있습니다.
            secure: false, // https가 아닌 환경에서도 사용할 수 있습니다.
            httpOnly: false // 자바스크립트에서 쿠키를 확인할 수 있습니다.
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Google 로그인 설정
passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://158.247.255.4:4545/auth/google/callback' // 로그인 후 리디렉션될 URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const exUser = await prisma.user.findUnique({
                    where: {
                        email: profile._json.email
                    }
                });

                // 기존 사용자일 경우
                if (exUser) {
                    const token = jwt.sign(
                        {
                            userEmail: exUser.email,
                            userNickname: exUser.nickname
                        },
                        // eslint-disable-next-line no-undef
                        process.env.JWT_KEY,
                        { expiresIn: '24h' }
                    );
                    return done(null, token);
                } else {
                    // 새로운 사용자일 경우
                    await prisma.user.create({
                        data: {
                            email: profile._json.email,
                            nickname: profile._json.name,
                            password: String(Math.floor(100000 + Math.random() * 200000))
                        }
                    });

                    const token = jwt.sign(
                        {
                            userEmail: profile._json.email,
                            userNickname: profile._json.name
                        },
                        // eslint-disable-next-line no-undef
                        process.env.JWT_KEY,
                        { expiresIn: '24h' }
                    );
                    return done(null, token);
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        }
    )
);

// Kakao 로그인 설정
passport.use(
    new KakaoStrategy.Strategy(
        {
            clientID: KAKAO_CLIENT_ID,
            clientSecret: KAKAO_CLIENT_SECRET,
            callbackURL: 'http://158.247.255.4:4545/auth/kakao/callback' // 로그인 후 리디렉션될 URL
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
                const exUser = await prisma.user.findUnique({
                    where: {
                        email: String(profile.id)
                    }
                });
                // 기존 사용자일 경우
                if (exUser) {
                    const token = jwt.sign(
                        {
                            userEmail: exUser.email,
                            userNickname: exUser.nickname
                        },
                        // eslint-disable-next-line no-undef
                        process.env.JWT_KEY,
                        { expiresIn: '24h' }
                    );
                    return done(null, token);
                } else {
                    // 새로운 사용자일 경우
                    await prisma.user.create({
                        data: {
                            email: String(profile.id),
                            nickname: profile.username,
                            password: String(Math.floor(100000 + Math.random() * 200000))
                        }
                    });
                    const token = jwt.sign(
                        {
                            userEmail: String(profile.id),
                            userNickname: profile.username
                        },
                        // eslint-disable-next-line no-undef
                        process.env.JWT_KEY,
                        { expiresIn: '24h' }
                    );
                    return done(null, token);
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        }
    )
);

// Serialize와 Deserialize는 사용자 정보를 세션에 저장하고 불러오는 로직입니다.
passport.serializeUser((token, done) => {
    done(null, token);
});
passport.deserializeUser((token, done) => {
    // 토큰을 이용하여 사용자를 인증 또는 사용자 정보를 가져오는 로직 구현
    // 예시: 토큰에서 userId를 추출하여 사용자 정보를 가져옴
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userEmail = decoded.userEmail;

    try {
        const user = prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });

        if (user) {
            done(null, user); // 사용자 객체를 세션에서 가져옴
        }
    } catch (err) {
        done(err); // 사용자 객체를 세션에서 가져옴
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    cors({
        origin: true
    })
);

app.use('/users', UserRouter);
app.use('/inquiries', InquiryRouter);
app.use('/searches', SearchRouter);

// 구글 로그인 라우트
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = req.user; // 사용자 토큰 정보 (예: JWT 토큰)
        res.locals.token = token;
        const twentyFourHours = 24 * 60 * 60 * 1000;
        res.cookie('token', token, { maxAge: twentyFourHours, httpOnly: false });
        res.redirect('http://158.247.255.4:3000');
    }
);

// 카카오 로그인 라우트
app.get('/auth/kakao', passport.authenticate('kakao'));

app.get(
    '/auth/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/' }),
    (req, res) => {
        console.log(req);
        const token = req.user; // 사용자 토큰 정보 (예: JWT 토큰)
        res.locals.token = token;
        const twentyFourHours = 24 * 60 * 60 * 1000;
        res.cookie('token', token, { maxAge: twentyFourHours, httpOnly: false });
        console.log(token);
        res.redirect('http://158.247.255.4:3000');
    }
);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, _next) => {
    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

// 서버의 포트 설정
const PORT = 4545; // 포트가 지정되어 있지 않으면 기본값으로 3000을 사용
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
