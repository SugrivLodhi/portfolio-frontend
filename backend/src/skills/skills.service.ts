import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async create(createSkillInput: CreateSkillInput): Promise<Skill> {
    const skill = this.skillsRepository.create(createSkillInput);
    return this.skillsRepository.save(skill);
  }

  async findAll(): Promise<Skill[]> {
    return this.skillsRepository.find({ order: { order: 'ASC' } });
  }

  async findActive(): Promise<Skill[]> {
    return this.skillsRepository.find({ 
      where: { isActive: true }, 
      order: { order: 'ASC' } 
    });
  }

  async findByCategory(category: string): Promise<Skill[]> {
    return this.skillsRepository.find({ 
      where: { category, isActive: true }, 
      order: { order: 'ASC' } 
    });
  }

  async findOne(id: string): Promise<Skill> {
    return this.skillsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateSkillInput: UpdateSkillInput): Promise<Skill> {
    await this.skillsRepository.update(id, updateSkillInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.skillsRepository.delete(id);
    return result.affected > 0;
  }

  async getCategories(): Promise<string[]> {
    const result = await this.skillsRepository
      .createQueryBuilder('skill')
      .select('DISTINCT skill.category', 'category')
      .getRawMany();
    
    return result.map(item => item.category);
  }
}