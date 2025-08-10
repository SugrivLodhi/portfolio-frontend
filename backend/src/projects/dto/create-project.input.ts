import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUrl, IsArray } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @Field(() => [String])
  @IsArray()
  technologies: string[];

  @Field({ nullable: true })
  @IsOptional()
  features?: string;

  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  order?: number;

  @Field({ defaultValue: true })
  @IsOptional()
  isActive?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  isFeatured?: boolean;
}