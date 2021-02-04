const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

exports.getBootcamps = asyncHandler(async(req, res, next) => {
  let query;

  const reqQuery = {
    ...req.query
  };

  console.log(reqQuery);

  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach(param => delete reqQuery[param]);

  let queryString = JSON.stringify(reqQuery);

  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  console.log(queryString);

  query = Bootcamp.find(JSON.parse(queryString));

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt')
  }

  //PAgination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total =  await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  const bootcamps = await query;
  res
    .status(200)
    .json({success: true, data: bootcamps, pagination: pagination})

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

exports.getBootcampsInRadius = asyncHandler(async(req, res, next) => {
  const {zipcode, distance} = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians Divide dist by radius of Earth Earth Radius = 3,963
  // mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [
          [
            lng, lat
          ],
          radius
        ]
      }
    }
  });

  res
    .status(200)
    .json({success: true, count: bootcamps.length, data: bootcamps});
});