const Bootcamp = require('../models/Bootcamp');

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({msg: 'Successfully fetched all posts'})
}

exports.getBootcamp = (req, res, next) => {
    res.status(200).json({msg: 'Successfully post' + req.params.id})
}

exports.crateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(200).json({message: 'Success', data: bootcamp})
    } catch (error) {
        res.status(400).json({success: flase});
    }
}

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({msg: 'Successfully updated post' + req.params.id})
}

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({msg: 'Successfully deleted post' + req.params.id})
}