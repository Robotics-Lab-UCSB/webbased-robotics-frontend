#!/bin/bash

# Ensure we are in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "This is not a git repository."
  exit 1
fi

# Find all files with merge conflicts
conflict_files=$(git diff --name-only --diff-filter=U)

if [ -z "$conflict_files" ]; then
  echo "No merge conflicts found."
  exit 0
fi

echo "Resolving conflicts by accepting current branch changes..."

# Iterate through each conflicted file and accept current changes
for file in $conflict_files; do
  echo "Accepting current changes for: $file"
  git checkout --ours "$file"
  git add "$file"
done

# Confirm resolution
echo "All conflicts resolved by accepting current branch changes."
echo "You can now commit the changes."
