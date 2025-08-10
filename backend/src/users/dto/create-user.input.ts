import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty()
  fullName: string;

  @Field(() => Role, { defaultValue: Role.USER })
  role?: Role;
}