import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('profiles')
export class Profile {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profileImage?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resumeUrl?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  githubUrl?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  linkedinUrl?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  twitterUrl?: string;

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