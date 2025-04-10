import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(email: string, hashedPassword: string): Promise<User> {
    const newUser = this.userRepo.create({ email, password: hashedPassword });
    return this.userRepo.save(newUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    return (await this.userRepo.findOne({ where: { id } })) ?? undefined;
  }
}