import express from 'express';
import rankController from '../controllers/rank';
import userController from '../controllers/user';


const router = express.Router();

router.use((req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({
        error: true,
        message: 'Authorization header undefined.'
    });

    if (req.headers.authorization !== 'qR:zt;5h%^') return res.status(403).json({
        error: true,
        message: 'Authorization invalid, please try again.'
    });

    next();
});

router.post('/rank', rankController.createRank);
router.post('/rank/edit', rankController.editRank);
router.get('/ranks', rankController.getAllRanks)
router.delete('/rank', rankController.deleteRank);
router.post('/user', userController.createUser);
router.delete('/user', userController.deleteUser);
router.post('/user/rank', userController.addRole);
router.delete('/user/rank', userController.removeRole);
router.get('/users', userController.getAllStaff);
router.get('/users/website', userController.getAllStaffWebsite);

export = router;
