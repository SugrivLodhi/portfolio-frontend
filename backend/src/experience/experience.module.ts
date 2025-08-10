import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceService } from './experience.service';
import { ExperienceResolver } from './experience.resolver';
import { Experience } from './entities/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  providers: [ExperienceService, ExperienceResolver],
})
export class ExperienceModule {}