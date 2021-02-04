const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse
} = require('../controllers/courses');

const Course = require('../models/Course');

const router = express.Router({mergeParams: true});

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', addCourse);

module.exports = router;