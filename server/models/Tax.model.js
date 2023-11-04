const mongoose = require('mongoose');
const { Schema } = mongoose;

const taxSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    income: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'senior'] },
    location: { type: String, required: true, enum: ['Dhaka', 'Chattogram', 'OtherCity', 'NonCity'] },
    taxFreeIncome: { type: Number, required: true },
    taxableIncome: { type: Number, required: true },
    tax: { type: Number, required: true }
});

const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;

