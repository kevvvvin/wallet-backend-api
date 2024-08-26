import Stripe from 'stripe';
import { CustomerResult, MockPayoutResult } from '../types';

export class CustomerResponseDto {
  message: string;
  result: CustomerResult;

  constructor(message: string, result: CustomerResult) {
    this.message = message;
    this.result = result;
  }
}

export class PaymentMethodResponseDto {
  message: string;
  result: Stripe.PaymentMethod | Stripe.ApiList<Stripe.PaymentMethod>;

  constructor(
    message: string,
    result: Stripe.PaymentMethod | Stripe.ApiList<Stripe.PaymentMethod>,
  ) {
    this.message = message;
    this.result = result;
  }
}

export class PaymentMethodRequestDto {
  type: string;
  token: string;
  constructor(type: string, token: string) {
    this.type = type;
    this.token = token;
  }
}

export class RetrievePaymentRequestDto {
  paymentMethodId: string;

  constructor(paymentMethodId: string) {
    this.paymentMethodId = paymentMethodId;
  }
}

export class AttachPaymentRequestDto {
  paymentMethodId: string;
  customerId: string;

  constructor(paymentMethodId: string, customerId: string) {
    this.paymentMethodId = paymentMethodId;
    this.customerId = customerId;
  }
}

export class DetachPaymentRequestDto {
  paymentMethodId: string;

  constructor(paymentMethodId: string) {
    this.paymentMethodId = paymentMethodId;
  }
}

// TODO: shared
export class PaymentIntentRequestDto {
  amount: number;
  currency: string;
  stripeCustomerId: string;

  constructor(amount: number, currency: string, stripeCustomerId: string) {
    this.amount = amount;
    this.currency = currency;
    this.stripeCustomerId = stripeCustomerId;
  }
}

export class PaymentIntentResponseDto {
  message: string;
  result: Stripe.PaymentIntent;

  constructor(message: string, result: Stripe.PaymentIntent) {
    this.message = message;
    this.result = result;
  }
}

export class PayoutResponseDto {
  message: string;
  result: Stripe.Payout | MockPayoutResult;

  constructor(message: string, result: Stripe.Payout | MockPayoutResult) {
    this.message = message;
    this.result = result;
  }
}
