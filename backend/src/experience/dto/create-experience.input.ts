import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class CreateExperienceInput {
  @Field()
  @IsNotEmpty()
  company: string;

  @Field()
  @IsNotEmpty()
  role: string;

  @Field()
  @IsNotEmpty()
  duration: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  companyLogo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  order?: number;

  @Field({ defaultValue: true })
  @IsOptional()
  isActive?: boolean;
}