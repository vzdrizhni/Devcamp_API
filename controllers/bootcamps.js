const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getBootcamps = asyncHandler(async(req, res, next) => {

  const bootcamps = await Bootcamp.find()
  res
    .status(200)
    .json({success: true, data: bootcamps})

})

exports.getBootcamp = asyncHandler(async(req, res, next) => {

  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
  }

  res
    .status(200)
    .json({success: true, data: bootcamp})

})

exports.crateBootcamp = asyncHandler(async(req, res, next) => {
  
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(200)
      .json({message: 'Success', data: bootcamp})
  
})

exports.updateBootcamp = asyncHandler(async(req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
  }

  next(error)
})

exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
  }

  res
    .status(200)
    .json({success: true, data: bootcamp})
})