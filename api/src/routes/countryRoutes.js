const { Router } = require('express');
const { 
        getCountries, 
        getCountryById, 
        postActivity,
        getActivities
} = require('../controllers/countryController.js')

const router = Router();



router.get('/', getCountries);
router.get('/myactivities', getActivities);
router.post('/activity', postActivity);
router.get('/:id', getCountryById);




module.exports = router;
