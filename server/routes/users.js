import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, _next) => {
    res.send('respond with a resource');
});

export default router;