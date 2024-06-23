#!/bin/bash

# Add all changes
git add .

# Prompt for a commit message
echo "Enter your commit message:"
read commit_message

# Commit with the entered message
git commit -m "$commit_message"

# Push to the main branch
git push origin main

echo "Changes pushed to GitHub!"