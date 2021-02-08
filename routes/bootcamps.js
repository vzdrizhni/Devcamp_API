const express = require('express');

const courseRouter = require('./courses')

const router = express.Router();

router.use('/:bootcampId/courses', courseRouter);

const {getBootcamps, getBootcamp, crateBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');
const {protect, authorize} = require('../middleware/auth');

router.get('/', advancedResults(Bootcamp, 'courses'), getBootcamps)

router.get('/:id', getBootcamp)

router.post('/', protect, crateBootcamp)

router.put('/:id', protect, updateBootcamp)

router.delete('/:id', protect, deleteBootcamp)

router.get('/radius/:zipcode/:distance', getBootcampsInRadius)

router.put('/:id/photo', protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

module.exports = router;