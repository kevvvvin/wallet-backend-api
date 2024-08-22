import { KycSubmissionStatusEnum } from '../enums';
import { IKyc } from '../types';
import { Kyc } from '../models';
import { Types } from 'mongoose';

export class KycRepository {
  async findById(id: string): Promise<IKyc | null> {
    return await Kyc.findById(new Types.ObjectId(id)).populate('user', 'email kycStatus');
  }

  async findByUserId(userId: string): Promise<IKyc | null> {
    return await Kyc.findOne({ user: new Types.ObjectId(userId) }).populate(
      'user',
      'email kycStatus',
    );
  }

  async findAll(): Promise<IKyc[]> {
    return await Kyc.find().populate('user', 'email kycStatus');
  }

  async create(userId: string, submissionStatus: KycSubmissionStatusEnum): Promise<IKyc> {
    let newKyc = Kyc.create({
      user: new Types.ObjectId(userId),
      submissionStatus: submissionStatus,
    });
    newKyc = (await newKyc).populate('user', 'email kycStatus');
    return await newKyc;
  }

  async update(userId: string, updateData: Partial<IKyc>): Promise<IKyc | null> {
    return await Kyc.findOneAndUpdate({ user: new Types.ObjectId(userId) }, updateData, {
      new: true,
      runValidators: true,
    }).populate('user', 'email kycStatus');
  }
}
