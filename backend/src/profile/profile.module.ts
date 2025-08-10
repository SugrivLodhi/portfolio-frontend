import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}