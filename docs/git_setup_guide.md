# Git Setup Guide for Camopa Beverages Dealership Management System

This guide will help you push the Camopa Beverages Dealership Management System to your Git repository.

## Prerequisites

- Git installed on your local machine
- A GitHub, GitLab, or Bitbucket account
- Access rights to create repositories

## Step 1: Initialize Git Repository

Navigate to the project directory and initialize a Git repository:

```bash
cd /path/to/camopa
git init
```

## Step 2: Add Files to Git

Add all the project files to the Git repository:

```bash
git add .
```

This command adds all files except those specified in the `.gitignore` file.

## Step 3: Make Initial Commit

Commit the files to the local repository:

```bash
git commit -m "Initial commit of Camopa Beverages Dealership Management System"
```

## Step 4: Create Remote Repository

1. Go to your GitHub/GitLab/Bitbucket account
2. Create a new repository named "camopa" or any name you prefer
3. Do not initialize the repository with a README, .gitignore, or license file

## Step 5: Link Local Repository to Remote Repository

Connect your local repository to the remote repository:

```bash
git remote add origin https://github.com/yourusername/camopa.git
```

Replace the URL with your actual repository URL.

## Step 6: Push to Remote Repository

Push your code to the remote repository:

```bash
git push -u origin main
```

Or if you're using `master` as your default branch:

```bash
git push -u origin master
```

## Step 7: Verify the Push

Visit your repository on GitHub/GitLab/Bitbucket to verify that all files have been pushed correctly.

## Additional Git Commands

### Checking Status

```bash
git status
```

### Creating a New Branch

```bash
git checkout -b feature/new-feature
```

### Switching Branches

```bash
git checkout branch-name
```

### Updating Your Local Repository

```bash
git pull
```

### Viewing Commit History

```bash
git log
```

## Best Practices

1. **Commit Often**: Make small, focused commits that address a single issue or feature
2. **Write Clear Commit Messages**: Use descriptive commit messages that explain what changes were made
3. **Use Branches**: Create separate branches for different features or fixes
4. **Pull Before Push**: Always pull the latest changes before pushing to avoid conflicts
5. **Review Before Committing**: Check your changes before committing to avoid pushing unwanted files

## Troubleshooting

### Authentication Issues

If you encounter authentication issues, you may need to:
- Use a personal access token instead of a password
- Set up SSH keys for secure authentication

### Large Files

If you have large files that exceed Git's limits:
- Consider using Git LFS (Large File Storage)
- Or exclude them from the repository and store them elsewhere

### Merge Conflicts

If you encounter merge conflicts:
```bash
git status  # Identify conflicting files
# Edit the files to resolve conflicts
git add .   # Add resolved files
git commit  # Complete the merge
```
