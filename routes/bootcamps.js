const express = require('express');

const router = express.Router();

router.get('/', (req, res)=> {
    res.status(200).json({msg: 'Successfully fetched all posts'})
})

router.get('/:id', (req, res)=> {
    res.status(200).json({msg: 'Successfully fetched one posts'})
})

router.post('/', (req, res)=> {
    res.status(200).json({msg: 'Successfully created post'})
})

router.put('/:id', (req, res)=> {
    res.status(200).json({msg: 'Successfully edited post'})
})

router.delete('/:id', (req, res)=> {
    res.status(200).json({msg: 'Successfully deleted post'})
})

module.exports = router;