import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('skills')
export class Skill {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  category: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  proficiency?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  icon?: string;

  @Field(() => Int)
  @Column({ default: 0 })
  order: number;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}