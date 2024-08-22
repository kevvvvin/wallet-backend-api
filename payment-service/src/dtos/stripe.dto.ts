import Stripe from 'stripe';
import { CustomerResult } from '../types';

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
