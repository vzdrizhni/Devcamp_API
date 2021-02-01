const express = require('express');

const router = express.Router();

const {getBootcamps, getBootcamp, crateBootcamp, updateBootcamp, deleteBootcamp} = require('../controllers/bootcamps')

router.get('/', getBootcamps)

router.get('/:id', getBootcamps)

router.post('/', crateBootcamp)

router.put('/:id', updateBootcamp)

router.delete('/:id', deleteBootcamp)

module.exports = router;