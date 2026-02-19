---
layout: page
titles:
  # @start locale config
  en: &EN       Consultations
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
  # @end locale config
key: consultations
---

<style>
/* Page-specific styles */
.consultation-container {
    max-width: 100%;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #333;
    line-height: 1.6;
}

.intro-section {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.intro-text {
    font-size: 1.1rem;
    color: #2c3e50;
}

.section-title {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
}

/* Expertise Grid */
.expertise-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.expertise-card {
    background: #fff;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 1.5rem;
    transition: transform 0.2s, box-shadow 0.2s;
}

.expertise-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: #3498db;
}

.expertise-title {
    font-weight: 600;
    color: #2980b9;
    margin-bottom: 0.5rem;
    display: block;
}

/* Learning Paths */
.path-card {
    background: #ffffff;
    border-left: 4px solid #3498db;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    margin-bottom: 2rem;
    padding: 2rem;
}

.path-title {
    font-size: 1.4rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-weight: 700;
}

.path-section-header {
    font-weight: 600;
    color: #34495e;
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
}

.path-section-header::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #3498db;
    border-radius: 50%;
    margin-right: 8px;
}

.path-list {
    list-style-type: none;
    padding-left: 0.5rem;
}

.path-list li {
    margin-bottom: 0.4rem;
    position: relative;
    padding-left: 1.2rem;
}

.path-list li::before {
    content: "•";
    color: #95a5a6;
    position: absolute;
    left: 0;
}

/* CTA Section */
.cta-container {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 2.5rem;
    text-align: center;
    margin-top: 4rem;
    margin-bottom: 2rem;
}

.cta-button {
    display: inline-block;
    background-color: #2ecc71;
    color: white !important;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 700;
    text-decoration: none;
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    transition: background-color 0.2s;
    box-shadow: 0 4px 6px rgba(46, 204, 113, 0.3);
}

.cta-button:hover {
    background-color: #27ae60;
    text-decoration: none;
    transform: translateY(-1px);
}

.highlight-box {
    background-color: #fff3cd;
    border-left: 4px solid #ffc107;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0 4px 4px 0;
}
</style>

<div class="consultation-container">

    <div class="intro-section">
        <div class="intro-text">
            Are you looking to elevate your skills and forge a path in IT? With over 16 years of experience as a technical generalist in high-impact environments—including roles and cooperation with giants like Cisco, P&G, and Iqvia—I bring a hands-on, practical approach to 1:1 consulting and mentoring. Whether you're starting out or leveling up, we’ll focus on real outcomes: better decisions, cleaner execution, and systems you can actually maintain.
        </div>
    </div>

    <h2 class="section-title">My Expertise</h2>

    <div class="expertise-grid">
        <div class="expertise-card">
            <span class="expertise-title">Software Architecture</span>
            Master the art of design, analysis, and trade-offs.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Technical Recruitment</span>
            Learn how to stand out in the IT job market.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Programming Languages</span>
            Dive deep into Java, Python, TypeScript, and more.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Framework Mastery</span>
            Gain expertise in Spring Boot for robust application development.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Cloud Technologies</span>
            Navigate Azure and GCP for optimal use in your projects.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Software Integration</span>
            Seamlessly integrate applications with external APIs and cloud tools.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Automation with AI</span>
            Design and implement no-code/low-code solutions to streamline your workflow.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Security & Reliability</span>
            Raise the baseline: secure coding, testing, DevOps, and delivery hygiene.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Personal Knowledge Management</span>
            Learn how to organize and manage your knowledge for optimal productivity.
        </div>
    </div>

    <h2 class="section-title">Offerings</h2>

    <div class="expertise-grid">
        <div class="expertise-card">
            <span class="expertise-title">Mentoring for Developers</span>
            Advance your career with guidance tailored to your current skill level and aspirations.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Career Launchpad</span>
            Ideal for those starting their journey in IT, offering the foundational knowledge needed to break into the field.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">System Design Mastery</span>
            Learn to design and analyze robust systems that stand the test of time.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Practical Integration Skills</span>
            Equip yourself with the skills to integrate applications practically with external services and the cloud.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Coding Best Practices</span>
            Enhance your coding with industry-standard practices that lead to clean, maintainable code.
        </div>
        <div class="expertise-card">
            <span class="expertise-title">Technical Interview Prep</span>
            From mock interviews to CV critiques, get the inside track on securing your next IT role.
        </div>
    </div>

    <h2 class="section-title">My Educational Approach</h2>
    <div class="expertise-grid">
        <div class="expertise-card" style="border-left: 4px solid #2ecc71;">
            <span class="expertise-title">Practice, Practice, Practice</span>
            We focus on hands-on exercises and real-world scenarios. I believe in <strong>deliberate practice</strong>—structured, challenging tasks designed to push your limits and provide immediate, actionable feedback.
        </div>
        <div class="expertise-card" style="border-left: 4px solid #2ecc71;">
            <span class="expertise-title">Hyper-Individualized</span>
            No cookie-cutter curriculums. Every session is adapted to your specific goals, current pace, and progress. We pivot as needed to ensure you're always learning what matters most to <em>you</em>.
        </div>
        <div class="expertise-card" style="border-left: 4px solid #9b59b6;">
            <span class="expertise-title">Cognitive Coaching</span>
            As a trained cognitive coach, I help you beyond just code. We’ll work on defining clear goals, maintaining motivation, and overcoming the mental or emotional blocks (like impostor syndrome) that might be holding you back.
        </div>
    </div>

    <div class="cta-container">
        <h2>Ready to level up?</h2>
        <p>Kick off your coding journey with a <strong>free 30-minute consultation</strong> to see how things fit for you. It’s a no-pressure way for us to figure out what you need and how I can help.</p>

        <a href="#book-consultation" class="cta-button">Book Free Consultation</a>

        <div class="highlight-box" style="text-align: left; margin-top: 2rem;">
            <strong>Transparent Pricing:</strong> After our chat, we’ll talk about pricing based on what you’re looking for, how long you want to learn, and how much time you can commit. If you’re really into learning and ready to dive deep, I’m here to make it work for your budget.
        </div>
    </div>

    <h2 class="section-title">Sample 1:1 Learning / Consulting Paths</h2>
    <p>These are examples you can pick from (and mix). Each path can be done as mentoring, hands-on workshops on your repo, or a hybrid—depending on how you learn best.</p>

    <div class="path-card">
        <div class="path-title">1) Architecture 101 — from fundamentals to confident design decisions</div>
        <div class="path-section-header">Great for you if</div>
        <ul class="path-list">
            <li>You want a clear mental model of “what architecture is” (and what it isn’t).</li>
            <li>You’re moving from building features to designing systems (or leading technical decisions).</li>
        </ul>
        <div class="path-section-header">Typical problems we’ll solve</div>
        <ul class="path-list">
            <li>“We keep arguing in circles: monolith vs microservices vs event-driven.”</li>
            <li>“Our system is hard to change and nobody knows where the boundaries should be.”</li>
            <li>“We ship, but reliability and maintainability are slowly getting worse.”</li>
            <li>“I need to justify decisions with real criteria, not opinions.”</li>
        </ul>
        <div class="path-section-header">What we’ll cover (practical, no fluff)</div>
        <ul class="path-list">
            <li>Architecture basics: boundaries, coupling/cohesion, abstraction, dependencies.</li>
            <li>Architecture styles: modular monolith, microservices, event-driven, serverless, hexagonal/ports & adapters—when they help and when they hurt.</li>
            <li>Quality attributes: security, reliability, scalability, performance, maintainability—how to turn them into decisions and checks.</li>
            <li>Decomposition and integration: contracts, versioning, idempotency, failure modes, async vs sync.</li>
            <li>Patterns that keep showing up: outbox, saga, CQRS, retries/backoff, timeouts, circuit breakers (and the trade-offs).</li>
            <li>Lightweight documentation that works: ADRs + C4 (or a simpler alternative) focused on clarity.</li>
        </ul>
        <div class="path-section-header">Outcomes</div>
        <ul class="path-list">
            <li>A decision framework you can reuse (criteria + heuristics).</li>
            <li>A clean “current vs target” architecture picture for your system/project.</li>
            <li>A step-by-step plan that reduces risk without a big-bang rewrite.</li>
        </ul>
    </div>

    <div class="path-card">
        <div class="path-title">2) GitHub DevOps practices — PR flow, CI/CD, releases, and repo hygiene</div>
        <div class="path-section-header">Great for you if</div>
        <ul class="path-list">
            <li>Your CI/CD feels fragile, slow, or inconsistent.</li>
            <li>You want a repo that helps you ship (instead of fighting you).</li>
        </ul>
        <div class="path-section-header">Typical problems we’ll solve</div>
        <ul class="path-list">
            <li>“CI randomly fails and we don’t trust it.”</li>
            <li>“Code reviews are inconsistent and quality gates are unclear.”</li>
            <li>“Releases are stressful, manual, and hard to roll back.”</li>
            <li>“Secrets/permissions in pipelines are messy.”</li>
        </ul>
        <div class="path-section-header">What we’ll cover</div>
        <ul class="path-list">
            <li>Repository standards: PR templates, issue templates, <code>CODEOWNERS</code>, branch protection rules.</li>
            <li>Clean PR workflow: review practices, small diffs, definition-of-done, release discipline.</li>
            <li>GitHub Actions: caching, matrices, reusable workflows, artifacts, stability patterns.</li>
            <li>Quality gates: tests, lint, coverage, build checks, flaky test reduction.</li>
            <li>Deployment basics: environments, approvals, rollback approach, progressive delivery (when relevant).</li>
            <li>Security in GitHub: minimal permissions, secret scanning, Dependabot, CodeQL (when it fits).</li>
        </ul>
        <div class="path-section-header">Outcomes</div>
        <ul class="path-list">
            <li>A pragmatic CI/CD setup matched to your stack and constraints.</li>
            <li>Faster feedback loops + fewer “mystery failures”.</li>
            <li>A repo workflow your team can follow without constant reminders.</li>
        </ul>
    </div>

    <div class="path-card">
        <div class="path-title">3) Spring Boot 101 — solid foundations, production-ready habits</div>
        <div class="path-section-header">Great for you if</div>
        <ul class="path-list">
            <li>You’re building (or maintaining) backend services and want clarity + best practices.</li>
            <li>You want to move from “it works” to “it scales, it’s testable, it’s safe”.</li>
        </ul>
        <div class="path-section-header">Typical problems we’ll solve</div>
        <ul class="path-list">
            <li>“Spring feels like magic—hard to reason about.”</li>
            <li>“Config differs between environments and breaks unexpectedly.”</li>
            <li>“Tests are slow/painful, so people avoid them.”</li>
            <li>“We’re missing the basics: security, observability, deployment hygiene.”</li>
        </ul>
        <div class="path-section-header">What we’ll cover</div>
        <ul class="path-list">
            <li>Application structure: modules, boundaries, DI lifecycle, configuration strategy.</li>
            <li>REST API design: validation, error handling, contracts, versioning, OpenAPI/Swagger.</li>
            <li>Persistence: transactions, performance pitfalls, migrations, data access patterns.</li>
            <li>Testing strategy: unit/integration split, realistic integration testing (including Testcontainers when useful).</li>
            <li>Spring Security basics: authn/authz, common mistakes, practical hardening.</li>
            <li>Observability: logs/metrics/traces, health checks, production readiness.</li>
        </ul>
        <div class="path-section-header">Outcomes</div>
        <ul class="path-list">
            <li>A clean baseline architecture for your Spring app (or an improvement plan for your current one).</li>
            <li>A test strategy that’s realistic and actually used.</li>
        </ul>
    </div>

    <div class="path-card">
        <div class="path-title">4) No-code / low-code automation — Make.com, n8n, APIs, and AI workflows</div>
        <div class="path-section-header">Great for you if</div>
        <ul class="path-list">
            <li>Your team does repeatable work manually (and it’s draining time).</li>
            <li>You need integrations that don’t break every other week.</li>
        </ul>
        <div class="path-section-header">Typical problems we’ll solve</div>
        <ul class="path-list">
            <li>“We want automation, but we don’t trust it in production.”</li>
            <li>“Retries, duplicates, and weird edge cases keep causing incidents.”</li>
            <li>“We have no monitoring—failures are discovered by users.”</li>
            <li>“We don’t know where AI fits safely in a process.”</li>
        </ul>
        <div class="path-section-header">What we’ll cover</div>
        <ul class="path-list">
            <li>Designing automations like systems: inputs/outputs, SLAs, error paths, auditability.</li>
            <li>Integrations: REST, webhooks, auth (API keys/OAuth), data contracts and transformations.</li>
            <li>Reliability patterns: retries/backoff, idempotency, deduplication, fallbacks, human-in-the-loop.</li>
            <li>Monitoring & cost control: alerting, logs, usage, guardrails.</li>
            <li>Using AI where it makes sense: classification, extraction, summarization, routing decisions.</li>
        </ul>
        <div class="path-section-header">Outcomes</div>
        <ul class="path-list">
            <li>Working automations with reliability and monitoring baked in.</li>
            <li>A repeatable blueprint for future workflows (so automation doesn’t become its own tech debt).</li>
        </ul>
    </div>

    <div class="path-card">
        <div class="path-title">5) AI in practice — automations, vibe coding, context engineering, model evaluation</div>
        <div class="path-section-header">Great for you if</div>
        <ul class="path-list">
            <li>You want AI to speed you up without losing code quality or safety.</li>
            <li>You’re experimenting, but results feel inconsistent or expensive.</li>
        </ul>
        <div class="path-section-header">Typical problems we’ll solve</div>
        <ul class="path-list">
            <li>“AI helps sometimes, but it also produces confident nonsense.”</li>
            <li>“We don’t know how to provide context and keep outputs aligned with our standards.”</li>
            <li>“Costs grow and we can’t predict ROI.”</li>
            <li>“We’re unsure how to use AI safely with sensitive data and access tokens.”</li>
        </ul>
        <div class="path-section-header">What we’ll cover</div>
        <ul class="path-list">
            <li>Practical workflows: where AI gives real ROI (coding, tests, debugging, docs, automations).</li>
            <li>Vibe coding, responsibly: prototyping fast + guardrails (tests, small diffs, review discipline, refactoring).</li>
            <li>Context engineering: structuring instructions, constraints, examples, and “source of truth”.</li>
            <li>Model basics: choosing the right model for the task, quality vs cost, when to go “bigger” vs “cheaper”.</li>
            <li>Evaluation: prompt/model test sets, regression checks, sanity metrics, how to iterate without guesswork.</li>
            <li>Safety: prompt injection risks, data handling rules, least-privilege integrations.</li>
        </ul>
        <div class="path-section-header">Outcomes</div>
        <ul class="path-list">
            <li>A repeatable AI workflow that fits your stack and standards.</li>
            <li>Better, cheaper, more predictable results (and fewer surprises).</li>
        </ul>
    </div>

    <div class="path-card">
        <div class="path-title">6) Secure coding + testing + DevOps — reliability, environment safety, and secure SDLC</div>
        <div class="path-section-header">Great for you if</div>
        <ul class="path-list">
            <li>You want to raise security and reliability without turning your process into bureaucracy.</li>
            <li>You’re preparing for audits, incidents, or simply want to sleep better after releases.</li>
        </ul>
        <div class="path-section-header">Typical problems we’ll solve</div>
        <ul class="path-list">
            <li>“Security is always last, and always late.”</li>
            <li>“Incidents happen, but we don’t have consistent prevention mechanisms.”</li>
            <li>“We run scanners, but nobody knows what to do with the results.”</li>
            <li>“Secrets, permissions, and environments feel risky.”</li>
        </ul>
        <div class="path-section-header">What we’ll cover</div>
        <ul class="path-list">
            <li>Secure SDLC in practice: minimum controls that work (and how to roll them out incrementally).</li>
            <li>Threat modeling (lightweight): assets, trust boundaries, realistic attack paths.</li>
            <li>Secure coding habits: authz, input validation, error handling, logging without leaks, dependency safety.</li>
            <li>Testing discipline: pyramid that fits your product, contract testing where it helps, flake reduction.</li>
            <li>Supply-chain security: dependency policies, updates, scanning, and sensible gating in CI.</li>
            <li>Operational safety: access rules, secrets handling, backups, observability, incident basics.</li>
        </ul>
        <div class="path-section-header">Outcomes</div>
        <ul class="path-list">
            <li>A clear baseline checklist for security & reliability for your project/repo/pipelines.</li>
            <li>A pragmatic improvement plan you can execute without a huge rewrite.</li>
        </ul>
    </div>

    <div class="cta-container">
        <h2>Ready to level up?</h2>
        <p>Kick off your coding journey with a <strong>free 30-minute consultation</strong> to see how things fit for you. It’s a no-pressure way for us to figure out what you need and how I can help.</p>

        <a href="#book-consultation" class="cta-button">Book Free Consultation</a>

        <div class="highlight-box" style="text-align: left; margin-top: 2rem;">
            <strong>Transparent Pricing:</strong> After our chat, we’ll talk about pricing based on what you’re looking for, how long you want to learn, and how much time you can commit. If you’re really into learning and ready to dive deep, I’m here to make it work for your budget.
        </div>
    </div>

    <div id="book-consultation">
        <div class="involveme_embed" data-project="cybershu-consultation-inquiry-form-a822" data-transparent-embed="true"><script src="https://michal-mazur.involve.me/embed"></script></div>
    </div>
</div>
