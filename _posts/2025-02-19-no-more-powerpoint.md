---
layout: article
title: No More PowerPoint - Use Marp
permalink: /no-more-powerpoint.html
tags: marp power-point presenation visual tool markdown pitch minimalism common-mark
lang: en
key: no-more-powerpoint
---
Last week, I was tasked with giving a presentation on "Dependabot" - a tool for automatically updating dependencies in projects.

After the last presentations, I felt tired of PowerPoint and decided to do something different.
<!--more-->

## Why I got tired of PowerPoint

Form, form, form. I was tired of the form.
PowerPoint forces to focus on form, layouts, colors, and pixels etc.
I don't like frontend development, I'm not a designer.
I prefer to focus on the content, not the layout, pixels.
I a presentation that was simple and minimalistic.

<img src="../assets/images/posts/no-more-powerpoint/meme-the-office.jpg" alt="The Office meme" class="image image--md" style="display: block; margin-left: auto; margin-right: auto;" />

## Marp - a simple solution

I used Markdown - a text format for creating presentations. Without using any AI :P

It's simple because all you need is a Markdown text file and a tool to display such a file, such as the `Marp for VS Code` plugin.
Then you can export the presentation to HTML, PDF. IF you don't use visual studio code, then you can use for example CLI to generate a presentation in PDF/HTML format.

The simplicity of this solution convinced me.

## Example of Marp presentation

```markdown
---
marp: true
theme: default
paginate: true
backgroundColor: #fff
style: |
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  .small-text {
    font-size: 0.75em;
  }
  .center {
    text-align: center;
  }

  header,
  footer {
    padding:20px
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
---

# :popcorn:Dependabot: Automated Dependency Updates
![bg right](./dp_logo.png)

<small>
Michał Mazur
</small>

---
<!-- headingDivider: 0-->


# What is Dependabot? 🤖

Imagine having a dedicated team member who:

- Never sleeps and its fully automated
- Checks your dependencies 24/7
- Creates perfect pull requests
- Knows about security issues before you do
- Supports multiple ecosystems:
  - github actions, npm, pip, Maven, NuGet, Bundler...

---

# Short Live Demo Time! 🎬
```

In a result you can get sth like that in PDF format:
[pdf](../assets/images/posts/no-more-powerpoint/marp_example.pdf)

## Links
- **Marpit:** [https://marpit.marp.app/](https://marpit.marp.app/)
- **Marp for VS Code:** [https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)

## Wrap-up
I hope the article at least intrigued you, you learned something new.

## Contact
Please leave any comments to let me know. If you have any questions, please feel free to contact me directly on:
- Twitter: [https://twitter.com/MichalMzr](https://twitter.com/MichalMzr)
- LinkedIn: [https://www.linkedin.com/in/michmzr/](https://www.linkedin.com/in/michmzr/)

You can also find my posts on my second blog [Geekowojażer.pl](https://www.geekowojazer.pl/)
