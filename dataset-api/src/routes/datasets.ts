import express from 'express'
import {getDatasetInfo, getDatasetRows, getDatasets, getDatasetSplits} from "../controllers/datasets";
import auth from "../middlwares/auth";

const router = express.Router();

router.get('/', getDatasets);
router.get('/info', auth, getDatasetInfo);
router.get('/rows', auth, getDatasetRows)
router.get('/splits', auth, getDatasetSplits)
//  auth,
export default router