const express = require('express');
const {
  getCourses
} = require('../controllers/courses');

const Course = require('../models/Course');

const router = express.Router({mergeParams: true});

router.get('/', getCourses)

module.exports = router;