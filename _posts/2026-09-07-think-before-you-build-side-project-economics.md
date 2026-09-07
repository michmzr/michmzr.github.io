---
layout: article
title: "Think Before You Build: Side Project Economics in the AI Era"
permalink: /think-before-you-build-side-project-economics.html
tags: ai side-project economy software-engineering productivity
lang: en
key: think-before-you-build-side-project-economics
---

AI can turn a rough idea into working code before the coffee gets cold. It makes coding cheaper and faster, but it does not make a side project free. The project still charges for time, attention, tokens, compute, and maintenance.

The dangerous sentence is no longer "This will take months." It is "I could make that vibecoding this weekend." 
<!--more-->

## No free lunch

Code is cheap now. It almost became commodity. Models can draft components, explain APIs, generate tests, run pentests and patiently revisit the same bug. That is genuine leverage.

My real budget starts with time and attention spent defining, checking, integrating, and correcting the result. Tokens, compute, hosting, storage, and external services belong there too.

Then there is cognitive load: 
- the mental effort of keeping requirements, code, tools, and unfinished decisions in working memory.[^cognitive-load] 
- Finally, there is maintenance: updates, failures, security fixes, migrations, and support after the interesting part ends.[^maintenance]

Every project consumes something, including my remaining sanity. The important question is whether the project ROI (return of investment) justifies all kinds of expenses.

## Test it!

Before I open an vibe tool, I try to make the problem survive a short brainstorming. This is the point where enthusiasm has to produce evidence. I ask:

- What problem does this solve, stated without mentioning a framework or model?
- What do I gain from it: time, money, attention, or a capability I cannot obtain elsewhere?
- How much am I willing to spend, including the cost of maintaining it later?
- What must the result actually do, and what can it deliberately ignore?

These questions are basic. That is useful, because side projects often become complicated long before they become necessary.

My rule is simple: **if I cannot explain the problem, I do not need a repository yet.** I need a clearer sentence. Git is excellent at tracking changes, but it cannot explain why the project exists.

### Price the outcome, not the excitement

The expected gain needs to be concrete enough to compare with the cost. "I will learn something" can be a valid outcome, but then the project is an educational expense. It should not be disguised as a productivity system.

The same applies to saving time. An automation that removes a repetitive task may be worth building. An automation that saves some clicks while creating a permanent monitoring obligation has simply moved the work into a less visible drawer.

## Check whether the market already solved the problem

Once the problem is clear, I look outside my own toolbox. Buying an existing solution is also a technical decision, and its maintenance model belongs in the comparison.

I could build my own todo application. Instead, I pay for [Todoist](https://www.todoist.com/). A good product already exists, the subscription costs less than maintaining my version, and my time remains available for problems I actually want to own.

That last word matters: own. Building software means owning its awkward edge cases, data migrations, broken integrations, and the weekends when a dependency decides it has developed a evil personality.

A subscription is not automatically cheaper. The comparison should include the full cost on both sides, not a monthly price on one side and optimistic enthusiasm on the other.

## If I build, code starts fourth

Sometimes the market check still points toward building because the available products do not meet the stated requirement. Fine. I still do not start with code. My sequence is:

1. **Brainstorming and product engineering.** Define the target user, problem, constraints, and smallest useful outcome.
2. **Requirements and assumptions.** Write down expected behavior, exclusions, dependencies, and claims that still need testing.
3. **Architecture and tool selection.** Choose the simplest structure that fits the requirements, including where data lives and what can fail.
4. **Code.** Implement only after the earlier decisions have reduced the number of attractive wrong turns.

AI makes this order more important, not less. A model can generate a great deal of plausible code for a poorly framed problem. Speed is impressive right up to the moment it accelerates in the wrong direction.

I use [Superpowers](https://github.com/obra/superpowers) to add structure to this process. I also use a "grill me" prompt that asks annoying questions early: What is missing? Which assumption is unsupported? What happens when the happy path takes a day off?

Those questions are cheaper before implementation. After implementation, they tend to arrive wearing bug reports.

## Use the smallest tool that closes the loop

There is one final check before a custom application earns its repository. Could [Make](https://www.make.com/en/product), [n8n](https://n8n.io/), or [Zapier](https://zapier.com/) connect the systems and handle the workflow? Could [Microsoft Excel](https://www.microsoft.com/en-us/microsoft-365/excel) store the data, run the calculation, and produce the output?

This is not an argument against engineering. It is an argument for matching the solution to the problem. A spreadsheet that works is more useful than a distributed system waiting for its first user.

A custom build earns its cost only when ownership creates a real advantage. In other cases, an existing product or a small automation may deliver the result with less ongoing work.

The point is not to suppress side projects. It is to spend scarce time and attention on the ones that deserve to exist. AI has lowered the price of producing code, but judgment still decides whether the code is an asset or a new recurring task.

**What have you built that should have been a subscription or a spreadsheet?**

P.S.
If you are interested in how to build cheap applications/SaaS, I totally recommend my last presentation at [Javeloper 2026](/javeloper-2026-zrob-cebulowego-sassa-notatki-prelegenta.html).

[^cognitive-load]: Lucian José Gonçales, Kleinner Farias, and Bruno C. da Silva, ["Measuring the cognitive load of software developers: An extended Systematic Mapping Study"](https://doi.org/10.1016/j.infsof.2021.106563), *Information and Software Technology*, 2021.
[^maintenance]: Sam Ramanujan and Sridhar Nerur, ["An exploratory analysis of the state of software maintenance research"](https://doi.org/10.1108/13287260910955093), *Journal of Systems and Information Technology*, 2009.
