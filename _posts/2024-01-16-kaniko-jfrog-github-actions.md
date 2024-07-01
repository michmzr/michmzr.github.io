---
layout: article
title: How to use Kaniko and JFrog with GitHub Actions
permalink: /articles/kaniko-jfrog.html
tags: kaniko, jfrog, github, actions, artifactory, devops, docker, ci, cd, github-actions
lang: en
key: how-to-use-kaniko-and-jfrog-with-github-actions
---

## Introduction

In this article, we will explore the use of Kaniko and JFrog with GitHub Actions to build and push a Docker image to JFrog Artifactory. This solution addressed issues I encountered while working on a project in my company. I hope it proves useful for you as well.
## Prerequisites

You must have:
- GitHub project with Dockerfile
- JFrog Artifactory account with created docker repository

## Assumptions
Your artifactory repository is called `docker-local` and you have created a user with username `docker` and password(api token) `docker-password`.
Full path is `https://artifactory.example.com/artifactory/docker-images` and you want to build and push image with name `my-image:latest`.

## Configuration

I use [kaniko](https://github.com/aevea/action-kaniko) action to build and push image to JFrog Artifactory.

**Example Github action job file:**

```yaml
  name: Build and push Docker image to JFrog Artifactory
  jobs:
  container-test-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Kaniko build
        uses: aevea/action-kaniko@master
        with:
          image: docker-images/my-image
          registry: artifactory.example.com
          username: "docker"
          password: "docker-password"
          tag: latest
          path: Dockerfile
      - run: docker images ls
```

you can alternatively use docker build command:

```yaml
  name: Build and push Docker image to JFrog Artifactory
  jobs:
  container-test-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: docker build
        uses: docker/build-push-action@v5
        with:
          push: false
          tags: my-image:latest
          file: Dockerfile
      - name: Login to DevHub Docker Hub
        uses: docker/login-action@v3
        with:
          registry: "artifactory.example.com"
          username: "docker"
          password: "docker-password"
      - run: docker image ls
      - run: docker tag my-image:latest artifactory.example.com/docker-images/my-image:latest
      - run: docker push artifactory.example.com/docker-images/my-image:latest
```

## Contact
I hope what I wrote is useful :). Please leave any comments to let me know. If you have any questions, please feel free to contact me directly on:
- Twitter: [https://twitter.com/MichalMzr](https://twitter.com/MichalMzr)
- LinkedIn: [https://www.linkedin.com/in/michmzr/](https://www.linkedin.com/in/michmzr/)

You can also find my posts on my second blog [Geekowojażer.pl](https://www.geekowojazer.pl/)
