import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skill } from './entities/skill.entity';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Mutation(() => Skill)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createSkill(@Args('createSkillInput') createSkillInput: CreateSkillInput) {
    return this.skillsService.create(createSkillInput);
  }

  @Query(() => [Skill], { name: 'skills' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.skillsService.findAll();
  }

  @Query(() => [Skill], { name: 'activeSkills' })
  findActive() {
    return this.skillsService.findActive();
  }

  @Query(() => [Skill], { name: 'skillsByCategory' })
  findByCategory(@Args('category') category: string) {
    return this.skillsService.findByCategory(category);
  }

  @Query(() => [String], { name: 'skillCategories' })
  getCategories() {
    return this.skillsService.getCategories();
  }

  @Query(() => Skill, { name: 'skill' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @Mutation(() => Skill)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateSkill(@Args('updateSkillInput') updateSkillInput: UpdateSkillInput) {
    return this.skillsService.update(updateSkillInput.id, updateSkillInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeSkill(@Args('id') id: string) {
    return this.skillsService.remove(id);
  }
}