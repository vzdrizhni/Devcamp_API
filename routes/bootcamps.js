const express = require('express');

const router = express.Router();

const {getBootcamps, getBootcamp, crateBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius} = require('../controllers/bootcamps')

router.get('/', getBootcamps)

router.get('/:id', getBootcamp)

router.post('/', crateBootcamp)

router.put('/:id', updateBootcamp)

router.delete('/:id', deleteBootcamp)

router.get('/radius/:zipcode/:distance', getBootcampsInRadius)

module.exports = router;