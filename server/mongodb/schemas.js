import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  e_mail: String,
  age: Number
})

export default testSchema
