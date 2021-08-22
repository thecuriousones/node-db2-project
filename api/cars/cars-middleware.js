const Car = require('./cars-model')
const vin = require('vin-validator')

const checkCarId = (req, res, next) => {
  const {id} = req.params
    Car.getById(id)
      .then(car =>{
        if(!car) {
          res.status(404).json({message: "car not found"})
        } else {
          req.car = car
          next()
        }
      })
      .catch(error =>{
        console.log(error)
        res.status(500).json({
          message: "Could not validate car id"
        })
      })
}

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage ) {
    res.status(400).json({message: "missing required fields"})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if (!vin.validate(req.body.vin)) {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  } else {
    next()
  }
}

const checkVinNumberUnique =  async (req, res, next) => {
  try {
    const existing = await Car.getByVin(req.body.vin)
    if (!existing) {
      next()
    } else {
      res.status(400).json({message: `vin ${req.body.vin} already exists`})
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }
