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