import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from './entities/experience.entity';
import { CreateExperienceInput } from './dto/create-experience.input';
import { UpdateExperienceInput } from './dto/update-experience.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Mutation(() => Experience)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createExperience(@Args('createExperienceInput') createExperienceInput: CreateExperienceInput) {
    return this.experienceService.create(createExperienceInput);
  }

  @Query(() => [Experience], { name: 'experiences' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.experienceService.findAll();
  }

  @Query(() => [Experience], { name: 'activeExperiences' })
  findActive() {
    return this.experienceService.findActive();
  }

  @Query(() => Experience, { name: 'experience' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('id') id: string) {
    return this.experienceService.findOne(id);
  }

  @Mutation(() => Experience)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateExperience(@Args('updateExperienceInput') updateExperienceInput: UpdateExperienceInput) {
    return this.experienceService.update(updateExperienceInput.id, updateExperienceInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeExperience(@Args('id') id: string) {
    return this.experienceService.remove(id);
  }
}