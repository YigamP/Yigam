// 미들웨어: 토큰 검증
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.slice(7).replace(/"/g, '');
    // eslint-disable-next-line no-undef
    const jwt_key = process.env.JWT_KEY;

    if (!authorizationHeader) {
        return res.status(403).json({ message: '토큰이 제공되지 않았습니다.' });
    }
    try {
        const decoded = jwt.verify(token, jwt_key);
        req.email = decoded.userEmail;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};
