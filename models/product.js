import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: false,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  rating: {
    type: Object,
    required: false,
    default: {
      rate: 0,
      count: 0
    }
  }
});

export default mongoose.model('Product', productSchema);