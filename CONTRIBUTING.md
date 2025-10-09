# Contributing to PJV Backend

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js (version specified in `.nvmrc`)
- MySQL database
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/pjv-backend.git
   cd pjv-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up the database**
   ```bash
   # Create database in MySQL
   mysql -u root -p < database_setup.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Branch Strategy

### Branch Naming Convention
- `main` - Production-ready code
- `development` - Integration branch for features
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical production fixes

### Workflow
1. Create a feature branch from `development`
2. Make your changes
3. Test thoroughly
4. Submit a pull request to `development`
5. After review and testing, merge to `main`

## Code Style

### JavaScript/Node.js
- Use 2 spaces for indentation
- Use semicolons
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use descriptive variable and function names
- Add comments for complex logic

### Example:
```javascript
// Good
const userController = {
  async registerUser(userData) {
    // Validate input data
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    return await User.create({
      ...userData,
      password: hashedPassword
    });
  }
};
```

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add user registration endpoint
fix: resolve database connection timeout
docs: update API documentation
refactor: improve error handling in auth controller
test: add unit tests for user model
```

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all tests pass**
4. **Update version numbers** if applicable
5. **Request review** from maintainers

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No sensitive data committed
```

## Testing

### Running Tests
```bash
npm test
```

### Writing Tests
- Write tests for all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

### Example Test:
```javascript
describe('User Registration', () => {
  it('should create a new user with valid data', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securePassword123'
    };

    const result = await User.create(userData);
    
    expect(result.id).toBeDefined();
    expect(result.email).toBe(userData.email);
    expect(result.password).not.toBe(userData.password); // Should be hashed
  });
});
```

## Security Guidelines

- **Never commit sensitive data** (passwords, API keys, etc.)
- **Use environment variables** for configuration
- **Validate all inputs** from users
- **Use prepared statements** for database queries
- **Hash passwords** with bcrypt
- **Follow OWASP guidelines** for web security

## Documentation

- Update README.md for significant changes
- Document new API endpoints
- Include code examples
- Keep security documentation current

## Getting Help

- Check existing issues before creating new ones
- Use clear, descriptive issue titles
- Provide reproduction steps for bugs
- Include relevant logs and error messages

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

## Recognition

Contributors will be recognized in the project's README.md and release notes.
