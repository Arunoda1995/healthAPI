const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const cholesterolController = require('../controllers/cholesterol') ;

//Get All cholesterol Data
router.get('/',cholesterolController.cholesterol_get_all);

//Get particular cholesterol data using choleterol id
router.get('/:cholesterolId',cholesterolController.cholesterol_get_cholesterol);

//Add new informatuion t0  cholesterol information
router.post('/',checkAuth,cholesterolController.cholesterol_create);


//Update particular cholesterol data using choleterol id
router.patch('/:cholesterolId',checkAuth,cholesterolController.cholesterol_update);

//Delete particular cholesterol data using choleterol id
router.delete('/:cholesterolId',checkAuth,cholesterolController.cholesterol_delete);


module.exports = router;