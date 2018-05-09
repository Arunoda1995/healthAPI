const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const bloodpressureController = require('../controllers/bloodpressure');

//Get all the Blood Pressure Infomation
router.get('/',bloodpressureController.bloodpressure_get_all);

//Get particuar  Blood Pressure Infomation using ID
router.get('/:bloodpressureId',bloodpressureController.bloodpressure_get_bloodpressure);

//Add  new Infomation For Blood Pressure
router.post('/',checkAuth,bloodpressureController.bloodpressure_create);

//Update blood pressure information using Blood Pressure Id
router.patch('/:bloodpressureId',checkAuth,bloodpressureController.bloodpressure_update);

//Delete particular Blood Pressure Information using Blood Pressure Id
 router.delete('/:bloodpressureId',checkAuth,bloodpressureController.bloodpressure_delete);


module.exports = router;

