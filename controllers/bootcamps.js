const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

exports.getBootcamps = async(req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find()
    res
      .status(200)
      .json({success: true, data: bootcamps})
  } catch (error) {
    next(error)
  }
}

exports.getBootcamp = async(req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
    }

    res
    .status(200)
      .json({success: true, data: bootcamp})
  } catch (error) {
    next(error)
  }
}

exports.crateBootcamp = async(req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(200)
      .json({message: 'Success', data: bootcamp})
  } catch (error) {
    next(error)
  }
}

exports.updateBootcamp = async(req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
  }

  next(error)
}

exports.deleteBootcamp = async(req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
  }

  res
    .status(200)
    .json({success: true, data: bootcamp})
}