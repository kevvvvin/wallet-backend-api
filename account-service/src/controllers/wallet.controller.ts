import { Request, Response, NextFunction } from 'express';
import { JwtPayload, WalletResult } from '../types';
import { WalletService } from '../services';
import {
  ConfirmPaymentIntentResponseDto,
  CreatePaymentIntentResponseDto,
  PaymentMethodRequestDto,
  PaymentMethodResponseDto,
  PaymentStatusResponseDto,
  PayoutResponseDto,
  TransactionsResponseDto,
  TransferResponseDto,
  WalletResponseDto,
} from '../dtos';
import { logger } from '../utils';

export class WalletController {
  constructor(private walletService: WalletService) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authHeader = req.header('Authorization') as string;
      const userDetails = req.payload as JwtPayload;

      logger.info(authHeader);

      const result: WalletResult = await this.walletService.create(
        userDetails,
        authHeader,
      );
      const message = 'Wallet created successfully';
      const response = new WalletResponseDto(message, result);

      logger.info(response);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getWalletBalance(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const userDetails = req.payload as JwtPayload;

      const result: WalletResult = await this.walletService.getWalletBalance(
        userDetails.sub,
      );
      const message = 'Retrieved wallet successfully';
      const response = new WalletResponseDto(message, result);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async addPaymentMethod(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authHeader = req.header('Authorization') as string;
      const paymentMethod: PaymentMethodRequestDto = req.body;
      const userDetails = req.payload as JwtPayload;

      const result = await this.walletService.addPaymentMethod(
        userDetails.sub,
        paymentMethod.paymentMethodId,
        authHeader,
      );

      const message = 'Payment method added successfully';
      const response = new PaymentMethodResponseDto(message, result);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getPaymentMethods(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const userDetails = req.payload as JwtPayload;

      const paymentMethods = await this.walletService.getPaymentMethods(userDetails.sub);

      const message = 'Retrieved payment methods successfully';
      const response = new PaymentMethodResponseDto(message, paymentMethods);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async deletePaymentMethod(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { paymentMethodId } = req.params;
      const authHeader = req.header('Authorization') as string;
      const userDetails = req.payload as JwtPayload;

      const deletedMethod = await this.walletService.deletePaymentMethod(
        userDetails.sub,
        paymentMethodId,
        authHeader,
      );
      const message = paymentMethodId.startsWith('pm_card')
        ? 'Test payment method deleted successfully'
        : 'Payment method deleted successfully';
      const response = new PaymentMethodResponseDto(message, deletedMethod);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async createPaymentIntent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authHeader = req.header('Authorization') as string;
      const { amount } = req.body;
      const userDetails = req.payload as JwtPayload;

      const paymentIntent = await this.walletService.createPaymentIntent(
        authHeader,
        amount,
        userDetails.sub,
      );

      const message = 'Payment intent created successfully';
      const response = new CreatePaymentIntentResponseDto(message, paymentIntent);

      logger.info(response);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  async confirmPaymentIntent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authHeader = req.header('Authorization') as string;
      const userDetails = req.payload as JwtPayload;
      const { paymentIntentId, paymentMethodId } = req.body;

      const result = await this.walletService.confirmPaymentIntent(
        authHeader,
        userDetails.sub,
        paymentIntentId,
        paymentMethodId,
      );

      const message = 'Payment intent confirmed successfully';
      const response = new ConfirmPaymentIntentResponseDto(message, result);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getPaymentStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { paymentIntentId } = req.params;
      const authHeader = req.header('Authorization') as string;
      const result = await this.walletService.getPaymentStatus(
        authHeader,
        paymentIntentId,
      );

      const message = 'Payment status retrieved successfully';
      const response = new PaymentStatusResponseDto(message, result);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async deposit(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authHeader = req.header('Authorization') as string;
      const userDetails = req.payload as JwtPayload;
      const { amount, paymentMethodId } = req.body;
      const result = await this.walletService.deposit(
        authHeader,
        userDetails.sub,
        amount,
        paymentMethodId,
      );

      const message = 'Deposit successful';
      const response = new ConfirmPaymentIntentResponseDto(message, result);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async withdraw(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authHeader = req.header('Authorization') as string;
      const userDetails = req.payload as JwtPayload;
      const { amount } = req.body;

      const result = await this.walletService.withdraw(
        authHeader,
        userDetails.sub,
        amount,
      );

      const message = 'Withdrawal successful';
      const response = new PayoutResponseDto(message, result);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async transfer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authHeader = req.header('Authorization') as string;
      const { toUserId, amount } = req.body;
      const userDetails = req.payload as JwtPayload;

      const result = await this.walletService.transfer(
        authHeader,
        userDetails.sub,
        toUserId,
        amount,
      );

      const message = 'Transfer successful';
      const response = new TransferResponseDto(message, result);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getTransactions(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authHeader = req.header('Authorization') as string;
      const userDetails = req.payload as JwtPayload;

      const transactions = await this.walletService.getTransactions(
        authHeader,
        userDetails.sub,
      );

      const message = 'Retrieved transactions successfully';
      const response = new TransactionsResponseDto(message, transactions);

      logger.info(response);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
