import { CreateExperienceInput } from './create-experience.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateExperienceInput extends PartialType(CreateExperienceInput) {
  @Field(() => ID)
  id: string;
}