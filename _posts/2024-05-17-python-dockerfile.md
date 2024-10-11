---
layout: article
title: How to work with Python virtual env in Dockerfile
permalink: /articles/python-dockerfile.html
tags: python  docker  dockerfile  venv  automation  devops
lang: en
key: python-in-dockerfile
---

If you work with Python, you probably need to activate a virtual environment to manage dependencies. Using a virtualenv requires activation each time you want to use Python or pip. This blog post will show you how to effectively and elegantly work with Python when building a Dockerfile.

## Method 1: Bad

Let's say you want to copy and change a shell script into a Dockerfile. The solution below won't work because of the line RUN . /venv/bin/activate. The virtual environment is activated, but it won't be available in subsequent commands because RUN commands run in separate processes.

```dockerfile
FROM alpine:latest

RUN apk add --no-cache python3 py3-pip

# Create and use a virtual environment
RUN python3 -m venv /venv

# This is wrong!
RUN . /venv/bin/activate

COPY . .

RUN pip install -r ./requirements.txt
RUN python main.py

```

I get build error:
```
#0 building with "default" instance using docker-container driver

#1 [internal] load build definition from Dockerfile
#1 transferring dockerfile: 276B done
#1 DONE 0.0s

#2 [internal] load metadata for docker.io/library/alpine:latest
#2 DONE 0.2s

#3 [internal] load .dockerignore
#3 transferring context: 2B done
#3 DONE 0.0s

#4 [1/7] FROM docker.io/library/alpine:latest@sha256:c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6b
#4 resolve docker.io/library/alpine:latest@sha256:c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6b done
#4 DONE 0.0s

#5 [internal] load build context
#5 transferring context: 91B done
#5 DONE 0.0s

#6 [2/7] RUN apk add --no-cache python3 py3-pip
#6 CACHED

#7 [3/7] RUN python3 -m venv /venv
#7 CACHED

#8 [4/7] RUN . /venv/bin/activate
#8 CACHED

#9 [5/7] COPY . .
#9 CACHED

#10 [6/7] RUN pip install -r ./requirements.txt
#10 0.587 error: externally-managed-environment
#10 0.587
#10 0.587 × This environment is externally managed
#10 0.587 ╰─>
#10 0.587     The system-wide python installation should be maintained using the system
#10 0.587     package manager (apk) only.
#10 0.587
#10 0.587     If the package in question is not packaged already (and hence installable via
#10 0.587     "apk add py3-somepackage"), please consider installing it inside a virtual
#10 0.587     environment, e.g.:
#10 0.587
#10 0.587     python3 -m venv /path/to/venv
#10 0.587     . /path/to/venv/bin/activate
#10 0.587     pip install mypackage
#10 0.587
#10 0.587     To exit the virtual environment, run:
#10 0.587
#10 0.587     deactivate
#10 0.587
#10 0.587     The virtual environment is not deleted, and can be re-entered by re-sourcing
#10 0.587     the activate file.
#10 0.587
#10 0.587     To automatically manage virtual environments, consider using pipx (from the
#10 0.587     pipx package).
#10 0.587
#10 0.587 note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
#10 0.587 hint: See PEP 668 for the detailed specification.
#10 ERROR: process "/bin/sh -c pip install -r ./requirements.txt" did not complete successfully: exit code: 1
------
 > [6/7] RUN pip install -r ./requirements.txt:
0.587     deactivate
0.587
0.587     The virtual environment is not deleted, and can be re-entered by re-sourcing
0.587     the activate file.
0.587
0.587     To automatically manage virtual environments, consider using pipx (from the
0.587     pipx package).
0.587
0.587 note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
0.587 hint: See PEP 668 for the detailed specification.
------
Dockerfile:13
--------------------
  11 |     COPY . .
  12 |
  13 | >>> RUN pip install -r ./requirements.txt
  14 |     RUN python main.py
  15 |
--------------------
```

The system Python environment is triggered when importing dependencies from requirements.txt, not the created `/venv/`!

## Method 2: Ugly

You can directly call `/venv/`'s Python and pip. It's a better solution, but it still has caveats. First, you need to do tedious work adding the prefix path. Secondly, when Python triggers a subprocess, it won't have access to `/venv/` dependencies. So, can we do better?

```dockerfile
FROM alpine:latest

RUN apk add --no-cache python3 py3-pip

# Create and use a virtual environment
RUN python3 -m venv /venv

COPY . .

RUN /venv/bin/pip install -r ./requirements.txt
RUN /venv/bin/python main.py
```

## Method 3: Good
Yes, we can. The good solution is to add `/venv/bin` to the system `PATH` environment variable.

```dockerfile
FROM alpine:latest

RUN apk add --no-cache python3 py3-pip

# Create and use a virtual environment
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

COPY . .
RUN pip install -r ./requirements.txt
RUN python main.py
```

As a result, we achieve an elegant solution!

The virtualenv documentation even states that activating the environment is “purely a convenience.”

If you read the code for activate, it does several things:

1. Figures out what shell you're running.
2. Adds a deactivate function to your shell, which can interfere with pydoc.
3. Changes the shell prompt to include the virtualenv name.
4. Unsets the `PYTHONHOME` environment variable, if it was set.
5. Sets two environment variables: `VIRTUAL_ENV` and `PATH`.

6. From Docker's perspective, points 1-4 are irrelevant. We only need to take care of `VIRTUAL_ENV` and `PATH`, which we can define manually.


## Wrap-up
I hope what I wrote is useful :). Please leave any comments to let me know. If you have any questions, please feel free to contact me directly on:
- Twitter: [https://twitter.com/MichalMzr](https://twitter.com/MichalMzr)
- LinkedIn: [https://www.linkedin.com/in/michmzr/](https://www.linkedin.com/in/michmzr/)

You can also find my posts on my second blog [Geekowojażer.pl](https://www.geekowojazer.pl/)
