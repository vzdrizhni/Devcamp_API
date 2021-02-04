const express = require('express');

const courseRouter = require('./courses')

const router = express.Router();

router.use('/:bootcampId/courses', courseRouter);

const {getBootcamps, getBootcamp, crateBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius} = require('../controllers/bootcamps')

router.get('/', getBootcamps)

router.get('/:id', getBootcamp)

router.post('/', crateBootcamp)

router.put('/:id', updateBootcamp)

router.delete('/:id', deleteBootcamp)

router.get('/radius/:zipcode/:distance', getBootcampsInRadius)

module.exports = router;