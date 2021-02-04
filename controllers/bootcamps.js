const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

exports.getBootcamps = asyncHandler(async(req, res, next) => {
  let query;

  let queryString = JSON.stringify(req.query)

  queryString =queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  query = Bootcamp.find(queryString);

  const bootcamps = await query;
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

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});