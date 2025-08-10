import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  profileImage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  resumeUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  twitterUrl?: string;

  @Field({ defaultValue: true })
  @IsOptional()
  isActive?: boolean;
}