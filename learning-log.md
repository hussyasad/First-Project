# Learning Log: Cloud Portfolio Project

## Week 1: Static site on S3 (13 Oct 2026)

### What I built
A static portfolio site (HTML, CSS, JavaScript) hosted on an S3 bucket with static website hosting turned on. The code is in GitHub.

### Problem: portfolio images were not loading
**Symptom:** The page loaded, but the portfolio images were broken.

**Cause:** The HTML asks for images at a path like `images/<file name>`. S3 does not have real folders. It stores every file under a full name called a key, and `images/` is part of that name. I uploaded the images loose, so their keys had no `images/` in front. The path in the HTML did not match the key in S3.

**Fix:** I uploaded the images using Add folder, so the keys became `images/<file name>`. The paths matched and the images loaded.

### Lessons
1. The path in the HTML must match the S3 key exactly.
2. S3 paths are case sensitive.
3. Use Add folder, not Add files, to keep the folder structure.
4. In the browser (F12, Network tab), status 404 means the file is not at that path. Status 403 means it is blocked.

Source: AWS S3 docs on folders and keys, https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-folders.html

### Done this week
1. Root user has MFA
2. Site built in VS Code
3. Code pushed to GitHub
4. Site live on S3 website hosting
5. Images fixed

### Next
Week 2: CloudFront for HTTPS, make the bucket private, add a custom domain.
