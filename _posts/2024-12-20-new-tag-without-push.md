---
layout: article
title: How to create new docker image tag without push on JFrog and AWS ECR
permalink: new-tag-without-push-jfrog-aws-ecr.html
tags: docker, jfrog, artifactory, ecr, aws, tag, push, pull, image, container, registry
lang: en
key:  new-tag-without-push-jfrog-aws-ecr
---
Hi  ✋,

I was recently working on signing Docker images and found a performance issue. In order to sign the image,
I had to pull the image from the registry, calculate the hash and create the signature file, and push the new tag to artifactory. This process took a lot of time, especially if the image was large. I was looking for a way to optimise this process.
 <!--more-->
I found a hack to remotely create new tags on JFrog and AWS ECR docker repositories without pulling and pushing the image. It's a simple trick, but it can save you a lot of time. I will show you an example of how to do it on Github Actions

## Classic method

```
docker pull artifactory.example.com/my-image:1.0.0
docker tag artifactory.example.com/my-image:1.0.0 artifactory.example.com/my-image:1.0.1
docker push artifactory.example.com/my-image:1.0.1
```

## JFrog

Below exampl pipeline steps uses JFrog API to fetch the image manifest and add new tag to the image `${{env.IMAGE_NAME}}` tagged `${{env.SEMVER}}`.

## Pipeline configuration
```yaml
env:
  DEVHUB_REGISTRY_URL: artifactory.example.com # JFrog registry url
  DEVHUB_REPO_NAME: docker # JFrog docker repository name
  IMAGE_NAME: my-image # Docker image name
  SEMVER: 1.0.0 # Current image tag
  TARGET_SEMVER: 1.0.1 # New image tag
```

**Secrets:**
- ARTIFACTORY_USERNAME
- ARTIFACTORY_TOKEN

### Pipeline steps
{% gist da298ab933908a3d0610e75b18a513d9 jfrog-steps.yml  %}

## AWS ECR

### Pipeline configuration
```yaml
env:
  AWS_REGION: "" # AWS region name i.e us-east-1
  AWS_WORKFLOW_ROLE: "" # AWS role arn
  AWS_ROLE_SESSION_NAME: "" # AWS role session name

  IMAGE_NAME: my-image # Docker image name
  SEMVER: 1.0.0 # Current image tag
  TARGET_SEMVER: 1.0.1 # New image tag
```

### Pipeline steps
**Warning:**
Authentication with AWS ECR requires AWS credentials. Please make sure you have configured AWS credentials in your pipeline. My example uses one of the possible methods to configure AWS credentials in GitHub Actions.
{:.warning}

{% gist da298ab933908a3d0610e75b18a513d9 ecr-steps.yml %}

## Wrap-up
I hope the article at least intrigued you, you learned something new.

## Contact
Please leave any comments to let me know. If you have any questions, please feel free to contact me directly on:
- Twitter: [https://twitter.com/MichalMzr](https://twitter.com/MichalMzr)
- LinkedIn: [https://www.linkedin.com/in/michmzr/](https://www.linkedin.com/in/michmzr/)

You can also find my posts on my second blog [Geekowojażer.pl](https://www.geekowojazer.pl/)
