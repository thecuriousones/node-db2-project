const express = require('express');

const Cars = require('./cars-model.js');

const router = express.Router();

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware.js')


router.get('/', (req, res) => {
    Cars.getAll()
      .then(cars => {
        console.log(cars)
        res.status(200).json(cars);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the cars',
        });
      });
  });

  router.get('/:id', checkCarId,  (req,res) =>{
      res.status(200).json(req.car)
  })

  router.post('/', (req, res) => {
    Cars.create(req.body)
      .then(car => {
        res.status(201).json(car);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the car',
        });
      });
  });

module.exports = router;