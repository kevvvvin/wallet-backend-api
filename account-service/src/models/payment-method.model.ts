import mongoose, { Schema } from 'mongoose';
import { IPaymentMethod } from '../types';

const paymentMethodSchema = new Schema<IPaymentMethod>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  stripePaymentMethodId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  card: {
    brand: String,
    last4: String,
    expMonth: Number,
    expYear: Number,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: (): Date => new Date(),
  },
});

export const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
