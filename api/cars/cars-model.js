const db = require('../../data/db-config.js')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars')
    .where({ id })
    .first()
}

const create = async (car) => {
  const [id] = await db('cars').insert(car)

  return getById(id)
}

const getByVin = (vin) => {
  return db('cars')
  .where({ vin })
  .first()
}

module.exports = { getAll, getById, create, getByVin }