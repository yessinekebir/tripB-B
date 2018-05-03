var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Rent = require('../models/Rent');
var House = require('../models/House');
var auth = require('../middlewares/auth');

router.get('/', function(req, res, next) {
  if(req.body.city){
  House.find({city:req.body.city},function(err, house){
    if (err) return res.status(500).json({error: err});
    res.json(house);
  });
}
else {
  House.find(function(err, houses){
    if (err) return res.status(500).json({error: err});
    res.json(houses);
  });
}
})

// Aggiungere nuovo annuncio di una casa
router.post('/', auth.verify,  function(req, res){
    var house = new House();
    house.admin = req.user._id;
    house.city = req.body.city;
    house.address = req.body.address;
    house.price = req.body.price;
    house.save(function(err, houseSaved) {
        if (err) return res.status(500).json({message: err});
        req.user.house.push(houseSaved._id);
        req.user.save(function(err, userSaved) {
          res.status(201).json(houseSaved)
        })
    });
});
//Affittare una casa (Devi essere loggato)
router.post('/:id/rent', auth.verify,  function(req, res){
  House.findById(req.params.id, function(err, house) {
      if (err) return res.status(500).json({message: 'House not find'});
        var newRent = new Rent();
        var startDate = Date.parse(req.body.start);
            var endDate = Date.parse(req.body.end);
            var timeDiff = endDate - startDate;
            daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            newRent.cost = daysDiff*house.price;
            newRent.start = startDate;
            newRent.end = endDate;
        newRent.save(function(err, newRentSaved) {
          if (err) return res.status(500).json({message: err});
          req.user.rent.push(newRentSaved._id);
          req.user.save(function(err, userSaved) {
            res.status(201).json(newRentSaved)
          })

        })
      })

});
/*
//Metto il like alla casa in affitto
router.post('/:id/like', function(req, res, next) {
  House.findById({_id:req.params.id},function(err, house){
    if (err) return res.status(500).json({error: err});
    if(!house) return res.status(404).json({message: 'House not found - Cannot like!'})
    house.likes++;
    house.save(function(err, likeAdded){
      if (err) return res.status(400).json(err);
      res.status(201).json(house);

    })
  });

})

*/

module.exports = router;
