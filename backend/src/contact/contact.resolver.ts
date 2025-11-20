import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Resolver(() => Contact)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Mutation(() => Contact)
  createContact(@Args('createContactInput') createContactInput: CreateContactInput) {
    return this.contactService.create(createContactInput);
  }

  @Query(() => [Contact], { name: 'contacts' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.contactService.findAll();
  }

  @Query(() => [Contact], { name: 'unreadContacts' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findUnread() {
    return this.contactService.findUnread();
  }

  @Query(() => Contact, { name: 'contact' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Args('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Query(() => Int, { name: 'unreadContactsCount' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getUnreadCount() {
    return this.contactService.getUnreadCount();
  }

  @Mutation(() => Contact)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  markContactAsRead(@Args('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeContact(@Args('id') id: string) {
    return this.contactService.remove(id);
  }
}