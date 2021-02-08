// const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
// const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

exports.register = asyncHandler(async(req, res, next) => {
  const {name, email, password, role} = req.body;
  console.log(name, email, password);

  // Create user
  const user = await User.create({name, email, password, role});

  const token = user.getSignedJwtToken();

  res.json({data: user, token});
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // sendTokenResponse(user, 200, res);
  res.json({data: user})
});