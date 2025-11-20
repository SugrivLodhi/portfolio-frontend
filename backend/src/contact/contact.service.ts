import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactInput: CreateContactInput): Promise<Contact> {
    const contact = this.contactRepository.create(createContactInput);
    return this.contactRepository.save(contact);
  }

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findUnread(): Promise<Contact[]> {
    return this.contactRepository.find({ 
      where: { isRead: false }, 
      order: { createdAt: 'DESC' } 
    });
  }

  async findOne(id: string): Promise<Contact> {
    return this.contactRepository.findOne({ where: { id } });
  }

  async markAsRead(id: string): Promise<Contact> {
    await this.contactRepository.update(id, { isRead: true });
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.contactRepository.delete(id);
    return result.affected > 0;
  }

  async getUnreadCount(): Promise<number> {
    return this.contactRepository.count({ where: { isRead: false } });
  }
}