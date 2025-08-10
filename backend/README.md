# Portfolio Backend API

A dynamic portfolio backend built with NestJS and GraphQL, featuring role-based authentication and comprehensive CRUD operations for managing portfolio content.

## Features

- **GraphQL API** with Apollo Server
- **Role-based Authentication** (Admin/User)
- **JWT Authentication**
- **PostgreSQL Database** with TypeORM
- **Dynamic Content Management**:
  - Profile Information
  - Skills with Categories
  - Work Experience
  - Projects
  - Contact Messages
- **Admin Dashboard Support**
- **CORS Enabled** for frontend integration

## Tech Stack

- NestJS
- GraphQL with Apollo Server
- TypeORM
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up your PostgreSQL database

4. Configure environment variables in `.env`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=portfolio_db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
PORT=4000
```

5. Start the development server:
```bash
npm run start:dev
```

The GraphQL playground will be available at `http://localhost:4000/graphql`

## API Endpoints

### Authentication
- `register` - Register a new user
- `login` - Login user

### Profile Management (Admin only)
- `createProfile` - Create profile
- `updateProfile` - Update profile
- `activeProfile` - Get active profile (public)
- `setActiveProfile` - Set active profile

### Skills Management (Admin only)
- `createSkill` - Create skill
- `updateSkill` - Update skill
- `removeSkill` - Delete skill
- `activeSkills` - Get active skills (public)
- `skillsByCategory` - Get skills by category (public)
- `skillCategories` - Get all categories (public)

### Experience Management (Admin only)
- `createExperience` - Create experience
- `updateExperience` - Update experience
- `removeExperience` - Delete experience
- `activeExperiences` - Get active experiences (public)

### Projects Management (Admin only)
- `createProject` - Create project
- `updateProject` - Update project
- `removeProject` - Delete project
- `activeProjects` - Get active projects (public)
- `featuredProjects` - Get featured projects (public)

### Contact Management
- `createContact` - Submit contact form (public)
- `contacts` - Get all contacts (Admin only)
- `unreadContacts` - Get unread contacts (Admin only)
- `markContactAsRead` - Mark contact as read (Admin only)

## Database Schema

The application uses the following entities:
- **Users** - Authentication and role management
- **Profiles** - Personal information and social links
- **Skills** - Technical skills with categories and proficiency
- **Experiences** - Work experience and timeline
- **Projects** - Portfolio projects with technologies and links
- **Contacts** - Contact form submissions

## Role-based Access Control

- **Admin**: Full CRUD access to all resources
- **User**: Limited access (can be extended as needed)
- **Public**: Read access to active content only

## GraphQL Schema

The GraphQL schema is auto-generated and available at `/graphql` endpoint. You can explore all available queries and mutations using the GraphQL playground.

## Development

```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod
```

## Frontend Integration

This backend is designed to work with your existing Next.js portfolio. Update your frontend to consume the GraphQL API instead of static data.

Example GraphQL queries:

```graphql
# Get active profile
query {
  activeProfile {
    name
    title
    description
    email
    phone
    profileImage
    resumeUrl
    githubUrl
    linkedinUrl
    twitterUrl
  }
}

# Get skills by category
query {
  skillsByCategory(category: "Frontend") {
    name
    proficiency
    icon
  }
}

# Get active projects
query {
  activeProjects {
    title
    description
    image
    liveUrl
    githubUrl
    technologies
  }
}
```

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Role-based access control
- Input validation using class-validator
- CORS configuration for frontend integration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request