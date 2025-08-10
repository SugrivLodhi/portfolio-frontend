import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('experiences')
export class Experience {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  company: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @Column()
  duration: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  companyLogo?: string;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  endDate?: Date;

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