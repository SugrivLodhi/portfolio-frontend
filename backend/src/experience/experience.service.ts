import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';
import { CreateExperienceInput } from './dto/create-experience.input';
import { UpdateExperienceInput } from './dto/update-experience.input';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {}

  async create(createExperienceInput: CreateExperienceInput): Promise<Experience> {
    const experience = this.experienceRepository.create(createExperienceInput);
    return this.experienceRepository.save(experience);
  }

  async findAll(): Promise<Experience[]> {
    return this.experienceRepository.find({ order: { order: 'ASC' } });
  }

  async findActive(): Promise<Experience[]> {
    return this.experienceRepository.find({ 
      where: { isActive: true }, 
      order: { order: 'ASC' } 
    });
  }

  async findOne(id: string): Promise<Experience> {
    return this.experienceRepository.findOne({ where: { id } });
  }

  async update(id: string, updateExperienceInput: UpdateExperienceInput): Promise<Experience> {
    await this.experienceRepository.update(id, updateExperienceInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.experienceRepository.delete(id);
    return result.affected > 0;
  }
}