---
layout: article
title: Why I Refuse to Ditch Line-by-Line Code Reviews for AI
permalink: /ai-code-review.html
tags: ai code-review coding software-engineering
lang: en
key: ai-code-review
---

In the rush to automate everything, traditional code reviews are becoming an endangered species. Why spend hours reading code when an LLM can scan it in seconds? It sounds tempting, but relying solely on AI for reviews might be a costly mistake.

I wouldn’t walk away from developer-led, line-by-line code review, because:

1. For a review to be actually good, it needs multiple perspectives: technical correctness, adherence to coding standards, business correctness (logic), and architecture. I doubt a single prompt can cover all of that.

2. To do a proper review, an AI agent would have to analyze dependencies, understand requirements, build code/logic diagrams, and *then* review—otherwise you’d need to dump half the repo into context and it’ll blow up in your face. As the saying goes: "It’s a recipe for disaster."

<!--more-->

I see AI review as support—maybe even a replacement for small changes—but it won’t replace the eyes of an experienced developer who knows the domain and the system.

The bigger problem I see is organizational culture. AI spits out code in large volumes, and (generally) devs won’t thoroughly review PRs. And we, as developers, will be—are—pushed harder and harder to produce more and more code, faster, using AI. Today we’re told to use one agent; soon we’ll be expected to run at least five in parallel.
