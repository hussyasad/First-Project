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

## Week 2: CloudFront, HTTPS and a private bucket (14 Oct 2026)

### What I built
A CloudFront distribution in front of the S3 bucket. Visitors now use the CloudFront HTTPS link. The bucket is private, and only my distribution can read it.

### How it works
Visitor, then CloudFront, then S3. CloudFront signs every request to S3 using origin access control (OAC). The bucket policy trusts the CloudFront service, but only for my one distribution, using a condition on the distribution ARN. Nobody can skip CloudFront and read the bucket directly.

### Decisions and why
1. **Used the regular bucket endpoint, not the S3 website endpoint.** The AWS guide says a website endpoint cannot use OAC. The console showed a banner recommending the website endpoint, but that needs a public bucket, so I ignored it. Since I no longer use S3 website hosting, I set the default root object to `index.html` on the distribution.
2. **Skipped AWS WAF.** The console estimated about $14 for 10 million requests a month. My site is static files with no logins, forms or database, so WAF adds cost without reducing real risk. I would revisit this if the site gets dynamic inputs. I did not verify WAF pricing at low traffic.
3. **A second distribution appeared, type Standard (Staging).** This is part of CloudFront continuous deployment, used to test config changes on a share of live traffic. I do not need it. I used the Standard one for everything.

### How I checked it
1. Site and images load over HTTPS from the CloudFront link.
2. The old S3 website URL no longer shows the site.
3. Block public access is on.
4. The bucket policy has one statement, allowing only my distribution.

### Lessons
1. A bucket policy can trust a service, not just a user. The Condition limits it to my distribution.
2. Copy and paste IDs. Do not retype them, because the letter O and the number 0 look the same.
3. Test in a private window so cached files do not hide problems.
4. Read the cost estimate before enabling any extra service.

Sources:
1. AWS CloudFront guide, restrict access to an S3 origin: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
2. AWS CloudFront guide, continuous deployment: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/continuous-deployment.html

### Next
1. Check for the unused staging distribution and delete it, following the AWS page on staging distributions.
2. Optional: custom domain with Route 53 and a certificate.
3. Week 3: visitor counter with Lambda, API Gateway and DynamoDB.
