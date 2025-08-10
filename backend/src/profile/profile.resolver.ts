import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createProfile(@Args('createProfileInput') createProfileInput: CreateProfileInput) {
    return this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { name: 'activeProfile' })
  findActive() {
    return this.profileService.findActive();
  }

  @Query(() => Profile, { name: 'profile' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateProfile(@Args('updateProfileInput') updateProfileInput: UpdateProfileInput) {
    return this.profileService.update(updateProfileInput.id, updateProfileInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeProfile(@Args('id') id: string) {
    return this.profileService.remove(id);
  }

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  setActiveProfile(@Args('id') id: string) {
    return this.profileService.setActive(id);
  }
}