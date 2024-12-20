---
layout: article
title: How to create new docker image tag without push on JFrog and AWS ECR
permalink: new-tag-without-push-jfrog-aws-ecr.html
tags: docker, jfrog, artifactory, ecr, aws, tag, push, pull, image, container, registry
lang: en
key:  new-tag-without-push-jfrog-aws-ecr
---

# How to create new docker image tag without push on JFrog and AWS ECR

Hi  ✋,

I was recently working on signing docker images and I found a performance issue. In order to sign the image,
I had to pull the image from the registry, calculate hash and create signature file, and push new tag to artifactory. This process was taking a lot of time, especially when the image was large. I was looking for a way to optimize this process.
 <!--more-->
I found a hack how to create remotely new tag on JFrog and AWS ECR docker repositories without pulling and pushing the image. It's a simple trick, but it can save you a lot of time. I will show you example how to do it on Github Actions

## Classic method

```
docker pull artifactory.example.com/my-image:1.0.0
docker tag artifactory.example.com/my-image:1.0.0 artifactory.example.com/my-image:1.0.1
docker push artifactory.example.com/my-image:1.0.1
```

## JFrog

Below pipelines uses JFrog API to fetch the image manifest and add new tag to the image `${{env.IMAGE_NAME}}` tagged `${{env.SEMVER}}`.

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
```yaml
- name: Login to JFrog Docker Hub
  uses: docker/login-action@9780b0c442fbb1117ed29e0efdff1e18412f7567 #v3.3.0
  with:
    registry: artifactory.example.com
    username: ${{ secrets.ARTIFACTORY_USERNAME }}
    password: ${{ secrets.ARTIFACTORY_TOKEN }}
- run: |
    JFROG_URL="https://${{ env.DEVHUB_REGISTRY_URL }}/"
    REPO_NAME="${{env.DEVHUB_REPO_NAME}}"
    JFROG_CREDS="${{ secrets.ARTIFACTORY_USERNAME }}:${{ secrets.ARTIFACTORY_TOKEN }}"

    echo "Fetching the image manifest for $IMAGE_NAME:${SEMVER}..."
    curl -sS -u $JFROG_CREDS \
    "${JFROG_URL}artifactory/api/docker/$REPO_NAME/v2/$IMAGE_NAME/manifests/${SEMVER}" \
    -H "Accept: application/vnd.docker.distribution.manifest.v2+json" \
    -o manifest.json

    if [ $? -ne 0 ]; then
      echo "Failed to fetch the manifest. Exiting."
      exit 1
    fi

    # Validate manifest.json content
    if ! jq . manifest.json > /dev/null 2>&1; then
      echo "Invalid JSON in manifest.json. Exiting."
      exit 1
    fi

    echo "Successfully fetched the manifest."

    # Step 2: Add the New Tag
    echo "Adding the new tag ${TARGET_SEMVER} to the image..."
    curl -sS -u $JFROG_CREDS -X PUT \
    "${JFROG_URL}artifactory/api/docker/$REPO_NAME/v2/$IMAGE_NAME/manifests/${TARGET_SEMVER}" \
    -H "Content-Type: application/vnd.docker.distribution.manifest.v2+json" \
    -d @manifest.json

    if [ $? -ne 0 ]; then
      echo "Failed to add the new tag. Exiting."
```

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
Authentication with AWS ECR requires AWS credentials. Please make sure you have configured AWS credentials in your pipeline. My example used on the possible mothods to configure AWS credentials in Github Actions.


```yaml
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@e3dd6a429d7300a6a4c196c26e071d42e0343502 # v4.0.2
  with:
    role-to-assume: ${{ env.AWS_WORKFLOW_ROLE }}
    role-session-name: ${{env.AWS_ROLE_SESSION_NAME}}
    aws-region: ${{env.AWS_REGION}} }}
- name: Login to Amazon ECR
  id: login-ecr
  uses: aws-actions/amazon-ecr-login@062b18b96a7aff071d4dc91bc00c4c1a7945b076 #v2.01
- name: get ECR registry name
  run: |
    echo "ECR_REPO_URL=${{ steps.login-ecr.outputs.registry }}" >> $GITHUB_ENV
- run: |
    # Step 1: Get the image manifest for the existing tag
    echo "Fetching the image manifest for $IMAGE_NAME:${SEMVER} from AWS ECR..."
    IMAGE_MANIFEST=$(aws ecr batch-get-image --repository-name "$IMAGE_NAME" --image-ids imageTag=${SEMVER}  --query 'images[].imageManifest'  --output text)

    if [ -z "$IMAGE_MANIFEST" ]; then
      echo "Failed to fetch the image manifest. Exiting."
      exit 1
    fi

    echo "Successfully fetched the image manifest."

    # Step 2: Create the new tag using the fetched manifest
    echo "Creating a new tag ${TARGET_SEMVER} for $IMAGE_NAME ..."
    aws ecr put-image \
    --repository-name $IMAGE_NAME \
    --image-tag ${TARGET_SEMVER} \
    --image-manifest "$IMAGE_MANIFEST"

    if [ $? -ne 0 ]; then
      echo "Failed to create the new tag. Exiting."
      exit 1
    fi

    echo "Successfully added the new tag ${TARGET_SEMVER} to the image $IMAGE_NAME ."
```

## Wrap-up
I hope the article at least intrigued you, you learned something new.

## Contact
Please leave any comments to let me know. If you have any questions, please feel free to contact me directly on:
- Twitter: [https://twitter.com/MichalMzr](https://twitter.com/MichalMzr)
- LinkedIn: [https://www.linkedin.com/in/michmzr/](https://www.linkedin.com/in/michmzr/)

You can also find my posts on my second blog [Geekowojażer.pl](https://www.geekowojazer.pl/)
