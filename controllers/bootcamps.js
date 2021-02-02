const Bootcamp = require('../models/Bootcamp');

exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({success: true, data: bootcamps})
    } catch (error) {
        res.status(400).json({success: false})
    }
}

exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        res.status(200).json({success: true, data: bootcamp})
        if (!bootcamp) {
            res.status(404)
        }
    } catch (error) {
        next(error)
    }
}

exports.crateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(200).json({message: 'Success', data: bootcamp})
    } catch (error) {
        res.status(400).json({success: flase});
    }
}

exports.updateBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!bootcamp) {
        return res.status(404).json({success: false})
    }

    res.status(200).json({success: true, data: bootcamp})
}

exports.deleteBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
        return res.status(404).json({success: false})
    }

    res.status(200).json({success: true, data: bootcamp})
}