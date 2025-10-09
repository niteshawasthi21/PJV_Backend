# GitHub Repository Setup Guide

This guide will help you set up your GitHub repository for the PJV Backend project.

## 🚀 Creating GitHub Repository

### Step 1: Create Repository on GitHub
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `pjv-backend` (or your preferred name)
   - **Description**: `Node.js backend API with user registration - Express.js, MySQL, JWT authentication`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

### Step 2: Connect Local Repository to GitHub
After creating the repository, GitHub will show you commands. Run these in your project directory:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pjv-backend.git

# Push main branch to GitHub
git push -u origin main

# Push development branch to GitHub
git push -u origin development
```

## 🔒 Repository Security Settings

### Step 3: Configure Repository Settings

1. **Go to repository Settings**
2. **Security Settings**:
   - Enable **"Dependency graph"**
   - Enable **"Dependabot alerts"**
   - Enable **"Dependabot security updates"**
   - Enable **"Code scanning"** (if available)

3. **Branch Protection Rules**:
   - Go to **"Branches"** in Settings
   - Add rule for **"main"** branch:
     - ✅ Require a pull request before merging
     - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - ✅ Include administrators

## 📋 GitHub Features to Enable

### Issues and Projects
- Enable **Issues** for bug tracking
- Enable **Projects** for project management
- Enable **Wiki** for documentation (optional)

### Actions (CI/CD)
Create `.github/workflows/ci.yml` for automated testing:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, development ]
  pull_request:
    branches: [ main, development ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
```

## 🔐 Environment Variables in GitHub

### For Production Deployment
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `JWT_SECRET`

### For Development
Create a `.env` file locally (never commit this to Git):
```bash
cp env.example .env
# Edit .env with your local database credentials
```

## 📝 Repository Template

Your repository should now have:

```
pjv-backend/
├── .github/
│   └── workflows/
│       └── ci.yml
├── config/
├── controllers/
├── models/
├── routes/
├── .editorconfig
├── .gitignore
├── .nvmrc
├── CONTRIBUTING.md
├── GITHUB_SETUP.md
├── README.md
├── SECURITY.md
├── database_setup.sql
├── env.example
├── index.js
└── package.json
```

## 🚀 Next Steps

1. **Clone the repository** on other machines:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pjv-backend.git
   cd pjv-backend
   npm install
   cp env.example .env
   ```

2. **Create feature branches** for new development:
   ```bash
   git checkout development
   git checkout -b feature/user-login
   ```

3. **Use Pull Requests** for code review and merging

4. **Set up deployment** to your hosting platform (Heroku, AWS, etc.)

## 📞 Support

If you encounter any issues with GitHub setup:
- Check GitHub documentation
- Verify your Git configuration
- Ensure you have proper permissions
- Contact the project maintainers

## 🎉 Congratulations!

Your Node.js project is now securely set up with:
- ✅ Git version control
- ✅ GitHub repository
- ✅ Branch protection
- ✅ Security best practices
- ✅ Professional documentation
- ✅ CI/CD ready
- ✅ Team collaboration ready
