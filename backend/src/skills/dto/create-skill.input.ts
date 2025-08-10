import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Min, Max } from 'class-validator';

@InputType()
export class CreateSkillInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  category: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  @Max(100)
  proficiency?: number;

  @Field({ nullable: true })
  @IsOptional()
  icon?: string;

  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  order?: number;

  @Field({ defaultValue: true })
  @IsOptional()
  isActive?: boolean;
}