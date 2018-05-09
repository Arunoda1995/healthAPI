const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const diabetesController = require('../controllers/diabetes');

//Get all diabtes information data
router.get('/',diabetesController.diabetes_get_all);

//Get particular diabetes information using diabetes id
router.get('/:diabetesId',diabetesController.diabetes_get_diabetes);

//Add new diabetes information
router.post('/',checkAuth,diabetesController.diabtes_create);

//Update diabetes infomation using diabetes id
router.patch('/:diabetesId',checkAuth,diabetesController.diabetes_update);

//Delete diabetes infomation using diabetes id
  router.delete('/:diabetesId',checkAuth,diabetesController.diabetes_delete);


module.exports = router;