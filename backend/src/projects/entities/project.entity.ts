import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('projects')
export class Project {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  liveUrl?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  githubUrl?: string;

  @Field(() => [String])
  @Column('simple-array')
  technologies: string[];

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  features?: string;

  @Field(() => Int)
  @Column({ default: 0 })
  order: number;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column({ default: false })
  isFeatured: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}