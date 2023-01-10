import express from 'express';
import controller from '../controllers/status'

const router = express.Router();

router.get('/', controller.healthStatusCheck);

export = router;
