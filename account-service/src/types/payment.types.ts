import { IPaymentMethod } from './';

export interface cardDetails {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

export type PaymentMethodDetails = Pick<
  IPaymentMethod,
  'user' | 'stripePaymentMethodId' | 'type' | 'card' | 'isDefault'
>;

export interface PaymentMethodResult {
  paymentMethod: PaymentMethodDetails | PaymentMethodDetails[];
}
