exports.getBootcamps = (req, res, next) => {
    res.status(200).json({msg: 'Successfully fetched all posts'})
}

exports.getBootcamp = (req, res, next) => {
    res.status(200).json({msg: 'Successfully post' + req.params.id})
}

exports.crateBootcamp = (req, res, next) => {
    res.status(200).json({msg: 'Successfully created post' + req.params.id})
}

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({msg: 'Successfully updated post' + req.params.id})
}

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({msg: 'Successfully deleted post' + req.params.id})
}