const express = require('express');

const courseRouter = require('./courses')

const router = express.Router();

router.use('/:bootcampId/courses', courseRouter);

const {getBootcamps, getBootcamp, crateBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

router.get('/', advancedResults(Bootcamp, 'courses'), getBootcamps)

router.get('/:id', getBootcamp)

router.post('/', crateBootcamp)

router.put('/:id', updateBootcamp)

router.delete('/:id', deleteBootcamp)

router.get('/radius/:zipcode/:distance', getBootcampsInRadius)

router.put('/:id/photo', bootcampPhotoUpload)

module.exports = router;