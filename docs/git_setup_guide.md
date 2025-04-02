# Git Setup Guide for Campa Beverages Dealership Management System

This guide will help you push the Campa Beverages Dealership Management System to your Git repository.

## Prerequisites

- Git installed on your local machine
- A GitHub, GitLab, or Bitbucket account
- Access rights to create repositories

## Step 1: Initialize Git Repository

Navigate to the project directory and initialize a Git repository:

```bash
cd /path/to/campa_dealership
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
git commit -m "Initial commit of Campa Beverages Dealership Management System"
```

## Step 4: Create Remote Repository

1. Go to your GitHub/GitLab/Bitbucket account
2. Create a new repository named "campa-dealership" or any name you prefer
3. Do not initialize the repository with a README, .gitignore, or license file

## Step 5: Link Local Repository to Remote Repository

Link your local repository to the remote repository:

```bash
git remote add origin https://github.com/yourusername/campa-dealership.git
```

Replace `yourusername` with your actual username and adjust the URL if you're using GitLab or Bitbucket.

## Step 6: Push to Remote Repository

Push your code to the remote repository:

```bash
git push -u origin main
```

If you're using an older version of Git that uses `master` as the default branch name:

```bash
git push -u origin master
```

## Step 7: Verify the Push

Go to your GitHub/GitLab/Bitbucket account and verify that all files have been pushed correctly.

## Additional Git Commands

### Check Repository Status

```bash
git status
```

### View Commit History

```bash
git log
```

### Create and Switch to a New Branch

```bash
git checkout -b feature-branch
```

### Pull Latest Changes

```bash
git pull origin main
```

## Best Practices

1. Make frequent, small commits with clear messages
2. Use branches for new features or bug fixes
3. Pull changes before starting new work
4. Review code before pushing to the main branch
5. Keep sensitive information out of the repository (use environment variables)

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
