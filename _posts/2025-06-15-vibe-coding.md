---
layout: article
title: Vibe coding might be very hard - presentation
permalink: /vibe-coding-might-be-very-hard.html
tags: vibe-coding coding cursor llm ai devops security practises presentation cloud tools
lang: en
key: vibe-coding-hard
---
Building apps with AI is easier than ever and ever.

Doing it right? Still hard. It still requires knowledge and skills. But it's easier than ever.

<!--more-->
I put together a few practical tips for builders of new era.

## Presentation
<embed src="../assets/docs/li-vibe-coding.pdf" type="application/pdf" width="100%" height="600px" />

[Download PDF](../assets/docs/li-vibe-coding.pdf)

## Fast tips for you
### Security

- **Keep API keys secret:** Never hardcode keys in your app. Store secrets in environment variables or a free secrets manager to keep them safe. 1Password has some interesting features that are worth looking at!
- **Scan for vulnerabilities:** Run a free Snyk scan (or enable GitHub Dependabot) to catch known security flaws in your code/dependencies early.
- **HTTPS everywhere:** Always serve your app over HTTPS. Tools like Let's Encrypt give free SSL certificates!
- **Lock your accounts:** Enable 2-factor authentication on critical services (GitHub, cloud platforms, AI tools etc.). It’s free and prevents easy hacks on your accounts.
- **Set hard budget limits** in all tools that charge for usage, like Chat-GPT. It might save you a lot of money!

### Version Control
- **Stop emailing zip files:** Use Git for version control. It tracks every change so you can undo mistakes and never lose code again.
- **Free cloud backup:** Push your code to GitHub or GitLab (free private repos) for safekeeping. If your laptop crashes, your code stays safe in the cloud.
- **Branch for safety:** Experiment on a new branch instead of directly on main. Merge when it's working, or delete it if not — no harm done to your main codebase.
- **GitHub Desktop helps:** If the command line scares you, use the free GitHub Desktop app. It's a point-and-click way to commit, push, and pull code – no terminal needed. Most coding editors have already build-in graphic interface for GIT.
- **Automate testing & deploys:** Use GitHub Actions (free) to run checks or deploy your app on every push. Automation catches issues early and saves manual effort.

### Deployment
- **One-click hosting:** Deploy your app on platforms like Railway Vercel. You just push code and chill.
- **No server? No problem:** Firebase offers hosting, database, and auth with a free plan. Great way to get backend features without managing any servers.
- **Static site hero:** Use Netlify, Vercel, or GitHub Pages for a static website or frontend app. They're free – just connect your repo or drop your files to go live.
- **Continuous deploy:** Link your code repo to your host (Railway, Vercel, etc.). Every time you push changes, the service auto-deploys your app. No more manual uploads!
- **Serverless functions:** Need a bit of backend logic? Use cloud functions on a free tier (Firebase Functions, Vercel,  Netlify, AWS, GCP, Azure). Your code runs on demand.

### Rules
- **Split project into smaller tasks** – Easier to manage, debug, and parallelize.
- **Write detailed documentation first** – Force model/agent to follow it. Include goals, edge cases, and examples.
- **Monitor token and compute costs** – Large files or loops can explode usage. If your app is using AI, then integrate your app with LangSmith or a similar observability tool.
- **Limit workspace scope** – Restrict to relevant directories or files only for each task.
- **Define clear input/output format** – Avoid ambiguity. Keep structure strict and predictable. Define all details and rules in each prompt.
- **Use isolated test cases** – Help the model validate logic step-by-step. Ask the model to create tests according to BDD (Behavior Driven Development).
- **Fail fast, retry smart** – Catch issues early, and design fallback or retry logic.


## Wrap-up
I hope the article at least intrigued you, you learned something new. If you would like to see more of such articles, please let me know!

## Contact
Please leave any comments to let me know. If you have any questions, please feel free to contact me directly on:
- Twitter: [https://twitter.com/MichalMzr](https://twitter.com/MichalMzr)
- LinkedIn: [https://www.linkedin.com/in/michmzr/](https://www.linkedin.com/in/michmzr/)

You can also find my posts on my second blog [Geekowojażer.pl](https://www.geekowojazer.pl/)
