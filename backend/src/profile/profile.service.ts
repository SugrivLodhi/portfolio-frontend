import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileInput: CreateProfileInput): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileInput);
    return this.profileRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async findActive(): Promise<Profile> {
    return this.profileRepository.findOne({ where: { isActive: true } });
  }

  async findOne(id: string): Promise<Profile> {
    return this.profileRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProfileInput: UpdateProfileInput): Promise<Profile> {
    await this.profileRepository.update(id, updateProfileInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.profileRepository.delete(id);
    return result.affected > 0;
  }

  async setActive(id: string): Promise<Profile> {
    // Deactivate all profiles
    await this.profileRepository.update({}, { isActive: false });
    // Activate the selected profile
    await this.profileRepository.update(id, { isActive: true });
    return this.findOne(id);
  }
}