// const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
// const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

exports.register = asyncHandler(async(req, res, next) => {
  const {name, email, password, role} = req.body;

  // Create user
  const user = await User.create({name, email, password, role});

  // grab token and send to email
  const confirmEmailToken = user.generateEmailConfirmToken();

  // Create reset url
  const confirmEmailURL = `${req
    .protocol}://${req
    .get('host',)}/api/v1/auth/confirmemail?token=${confirmEmailToken}`;

  const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;

  user.save({validateBeforeSave: false});

  const sendResult = await sendEmail({email: user.email, subject: 'Email confirmation token', message});

  sendTokenResponse(user, 200, res);
});