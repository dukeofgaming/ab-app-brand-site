#!/bin/bash
set -e

# Add the upstream remote if it doesn't exist
if ! git remote | grep -q '^upstream$'; then
  git remote add upstream https://github.com/dukeofgaming/ab-app.git
else
  echo "Remote 'upstream' already exists."
fi

git fetch upstream main

# Create the local branch 'upstream' from upstream/main, but do not check it out
if git show-ref --verify --quiet refs/heads/upstream; then
  echo "Local branch 'upstream' already exists. Resetting to upstream/main."
  git branch -f upstream upstream/main
else
  git branch upstream upstream/main
fi

echo "Local branch 'upstream' now points to 'upstream/main' but is not checked out."
