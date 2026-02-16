# Interpretable Deep Learning Website

Jekyll website for the Interpretable Deep Learning group and tutorial materials.

## Local Development

```bash
bundle install
bundle exec jekyll serve --livereload
```

## Automated Deployment (GitHub Pages)

This repository now deploys automatically with GitHub Actions via `.github/workflows/deploy.yml`.
On every push to `main` or `master`, the workflow builds the site and deploys `_site` to GitHub Pages.

### One-time GitHub setup

1. Open repository `Settings` -> `Pages`.
2. Under `Build and deployment`, set `Source` to `GitHub Actions`.
3. Push changes to `main` or `master`.
4. Check the `Actions` tab for the `Build and Deploy Jekyll Site` workflow run.

After this setup, you no longer need to manually build and push a deploy branch.
