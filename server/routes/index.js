import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, _next) => {
    res.send('하이');
});

export default router;
