import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const project = this.projectsRepository.create(createProjectInput);
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({ order: { order: 'ASC' } });
  }

  async findActive(): Promise<Project[]> {
    return this.projectsRepository.find({ 
      where: { isActive: true }, 
      order: { order: 'ASC' } 
    });
  }

  async findFeatured(): Promise<Project[]> {
    return this.projectsRepository.find({ 
      where: { isActive: true, isFeatured: true }, 
      order: { order: 'ASC' } 
    });
  }

  async findOne(id: string): Promise<Project> {
    return this.projectsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProjectInput: UpdateProjectInput): Promise<Project> {
    await this.projectsRepository.update(id, updateProjectInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.projectsRepository.delete(id);
    return result.affected > 0;
  }
}