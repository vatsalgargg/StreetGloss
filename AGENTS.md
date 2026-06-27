# AGENTS.md

<!-- waggle:auto-memory:start -->
## Waggle Automatic Memory

Use Waggle automatically for conversational memory.

At the start of a new session, if project, agent, or session scope is known, call prime_context.

Before answering questions that may depend on prior decisions, preferences, constraints, project state, or earlier conversation context, call query_graph with the narrowest relevant scope.

After completed turns that contain durable information such as decisions, preferences, constraints, requirements, user corrections, project facts, or meaningful task outcomes, call observe_conversation automatically.

Do not ask the user to trigger Waggle manually. Use it in the background when relevant.
<!-- waggle:auto-memory:end -->

---

## 🔒 Security Rules — MANDATORY

> These rules apply to EVERY code change. No exceptions.

### Before making any code change, check SECURITY.md:

1. **No secrets in frontend code** — API keys, tokens, passwords, and DB credentials must NEVER appear in `.html`, `.js`, or `.css` files. All secrets go in environment variables on the server.

2. **No `innerHTML` with user input** — Use `textContent` for any data that comes from the user or an external source. Template literal strings in JS are safe only if they contain no unescaped user-controlled values.

3. **Input validation on every form** — Every form field must have: correct `type` attribute, `maxlength` limit, `required` where needed, and sanitization before use.

4. **No `eval()`, `Function()`, or `document.write()`** — These are unconditionally forbidden.

5. **Authentication checklist** — When any auth system is added: passwords must use bcrypt/Argon2, sessions must expire, rate limiting must be implemented, tokens must never leak to frontend.

6. **IDOR prevention** — When any API or backend is added: every resource access must verify the logged-in user owns that resource before reading, writing, or deleting it.

7. **`localStorage` is not secret storage** — Never store tokens, passwords, or sensitive PII in `localStorage` or `sessionStorage`. Currently only cart data and cookie consent flags are stored there — keep it that way.

8. **Dependency hygiene** — Do not add new CDN scripts or npm packages without checking for known vulnerabilities. Always prefer SRI (`integrity` attribute) for CDN resources.

9. **Review SECURITY.md on every session** — Read [SECURITY.md](file:///v:/VG/websites/StreetGloss/SECURITY.md) at the start of any session that involves code changes. Update its status column when items are implemented.

10. **GDPR compliance** — The site has a cookie consent banner. Analytics and marketing trackers must NOT be activated until the user explicitly accepts them. Do not bypass this.

