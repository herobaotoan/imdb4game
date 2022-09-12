const express = require('express')
const router = express.Router()

const Game = require("../model/game.js")
 
//create a model Product ==> Products (database collection)
//Teacher => teachers , Course => courses
router.get('/games', function(req, res){
    Game.find({}, function(err, games){
       res.send(games)
    })
})
 
// router.post('/games', function(req, res){
//     Game.create(req.body, function(err, game){
//        res.send(game)
//     })
// })
 
router.put('/games', function(req, res){
   Game.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, genre: req.body.genre, developer: req.body.developer, platform: req.body.platform, rating: req.body.rating, img: req.body.img}, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/games/search', async function(req, res){
//    Product.find({name: req.params.keyword}, function(err, result){
//        res.send(result)
//    })
    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)
    const filterGenre = req.query.filterGenre
    const filterDev =  req.query.filterDev
    const filterPlatform =  req.query.filterPlatform
    const filterRating = parseInt(req.query.filterRating)
    

    //count number of documents:
    const number = await Game.countDocuments({name: {$regex: '.*' + keyword + '.*'}});
    const skipNo =pageSize*(pageNo-1)

    // Product.find({name: {$regex: '.*' + keyword + '.*'}}, 
    // function(err, result){
    //     res.send(result)
    // })

    const result = await Game.find({name: {$regex: '.*' + keyword + '.*'}, genre: {$regex: '.*' + filterGenre + '.*'}, developer: {$regex: '.*' + filterDev + '.*'}, platform: {$regex: '.*' + filterPlatform + '.*'}, rating: {$gt: filterRating}})
    .skip(skipNo).limit(pageSize)
    res.send({Size: number, Items: result})

})
 

module.exports = router
