const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({mergeParams: true});

const {protect} = require('../middleware/auth');

router.get('/', advancedResults(Course, {
  path: 'bootcamp',
  select: 'name description'
}), getCourses);
router.get('/:id', getCourse);
router.post('/', protect, addCourse);
router.put('/:id', protect, updateCourse);
router.delete('/:id', protect, deleteCourse);

module.exports = router;