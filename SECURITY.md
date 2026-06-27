# StreetGloss — Security Checklist

> **Status:** Living document. Must be reviewed every time code changes are made.
> **Last reviewed:** 2026-06-27
> **Reviewer:** Development team

---

## HOW TO USE THIS CHECKLIST

Before merging **any** code change — whether a feature, bug fix, or style tweak — scan the relevant sections below. Mark items that apply to the change and confirm they pass. If a new backend, API, or auth system is added, this document must be updated and all sections re-reviewed.

---

## 1. 🔒 HTTPS & Secure Deployment

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 1.1 | Site is **served exclusively over HTTPS** — no HTTP fallback | ⬜ TODO | Enforce via hosting platform (Netlify / Vercel / Nginx redirect) |
| 1.2 | **HSTS header** is set: `Strict-Transport-Security: max-age=31536000; includeSubDomains` | ⬜ TODO | Set at reverse proxy / CDN level |
| 1.3 | **Content-Security-Policy** header restricts script, style, and frame sources | ✅ DONE | Added as `<meta>` CSP in `index.html` |
| 1.4 | **X-Frame-Options: DENY** or `frame-ancestors 'none'` to prevent clickjacking | ⬜ TODO | Set at server/CDN level; CSP meta covers partial protection |
| 1.5 | **X-Content-Type-Options: nosniff** header is set | ⬜ TODO | Set at server/CDN level |
| 1.6 | **Referrer-Policy: strict-origin-when-cross-origin** is set | ⬜ TODO | Set at server/CDN level |
| 1.7 | **Permissions-Policy** header restricts camera, microphone, geolocation | ⬜ TODO | Set at server/CDN level |
| 1.8 | All **third-party scripts use Subresource Integrity (SRI)** `integrity` attribute | ⬜ TODO | GSAP CDN link needs SRI hash added |
| 1.9 | **Environment** (dev / staging / prod) is clearly separated | ⬜ TODO | Required once a backend is added |
| 1.10 | **Error pages** do not expose stack traces, server versions, or file paths | ✅ DONE | Pure static site — no server errors exposed |

**Server config snippet (Nginx) to add when deploying:**
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

---

## 2. 🔑 Secrets & Credentials Management

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 2.1 | **No API keys** hardcoded in any `.js`, `.html`, or `.css` file | ✅ DONE | Confirmed — no keys in frontend code |
| 2.2 | **No database credentials** in frontend code | ✅ DONE | No DB used yet — static site |
| 2.3 | **No payment gateway keys** in frontend code | ✅ DONE | Payment integration not yet built |
| 2.4 | **`.env` file is in `.gitignore`** and never committed | ⬜ TODO | Add `.gitignore` before adding a backend |
| 2.5 | All secrets are stored in **environment variables** (not config files) | ⬜ TODO | Required before any backend/API is added |
| 2.6 | **Git history** does not contain any previously committed secrets | ⬜ TODO | Run `git log -p | grep -i "key\|token\|secret\|password"` before first public push |
| 2.7 | **Third-party services** (analytics, payments) use **server-side keys** only | ⬜ TODO | Required when Razorpay / Google Analytics are added |
| 2.8 | Secrets are **never logged** to console or error messages | ✅ DONE | No console.log of sensitive data |

**Pre-commit check command:**
```bash
# Run before any git push to scan for leaked secrets
git log -p | grep -Ei "(api_key|apikey|secret|password|token|auth|private_key)\s*[:=]"
```

---

## 3. 🛡️ Input Validation & Sanitization

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 3.1 | **All form inputs are validated** on the frontend (type, length, format) | ✅ DONE | HTML5 `required`, `type`, `maxlength` attributes enforced |
| 3.2 | **No `innerHTML` with user-supplied data** — use `textContent` instead | ✅ DONE | Reviewed — all dynamic HTML uses controlled template strings, never raw user input |
| 3.3 | **Email inputs** validated against RFC-5322 pattern | ✅ DONE | `type="email"` + HTML5 validation |
| 3.4 | **Text inputs have `maxlength`** to prevent oversized payloads | ⬜ PARTIAL | Add `maxlength` attributes to contact form inputs |
| 3.5 | **No `eval()`** or `Function()` constructor used | ✅ DONE | Confirmed not present in codebase |
| 3.6 | **No `document.write()`** used | ✅ DONE | Confirmed not present |
| 3.7 | **URL / query parameters** are validated before use | ✅ DONE | No URL params are read/used currently |
| 3.8 | **File uploads** validated: type whitelist, size limit, server-side scan | ⬜ N/A | No file uploads on this site currently |
| 3.9 | **SQL injection** prevention in place | ⬜ N/A | No SQL DB yet — required before any backend |
| 3.10 | **Server-side validation mirrors** all client-side validation | ⬜ TODO | Required when backend API is added |

**Action required — add `maxlength` to contact form fields in `index.html`:**
- Name: `maxlength="100"`
- Email: `maxlength="254"`
- Message: `maxlength="2000"`
- Bug steps: `maxlength="500"`

---

## 4. 🔐 Authentication & Session Security

> **Current state:** No authentication system is implemented yet (deferred by user).
> This section defines the **requirements that must be met** before any auth is built.

| # | Requirement | Status |
|---|------------|--------|
| 4.1 | Passwords **hashed with bcrypt or Argon2** (minimum cost factor 12) | ⬜ NOT YET BUILT |
| 4.2 | **Password minimum complexity**: 8+ chars, mixed case, number or symbol | ⬜ NOT YET BUILT |
| 4.3 | **Login rate limiting**: max 5 attempts per 15 minutes per IP/account | ⬜ NOT YET BUILT |
| 4.4 | **Account lockout** after repeated failures with exponential backoff | ⬜ NOT YET BUILT |
| 4.5 | **Session tokens** are cryptographically random (min 128-bit entropy) | ⬜ NOT YET BUILT |
| 4.6 | **Session expiry**: absolute (8h) + idle (30min) timeout enforced server-side | ⬜ NOT YET BUILT |
| 4.7 | **Secure + HttpOnly + SameSite=Strict** flags set on session cookies | ⬜ NOT YET BUILT |
| 4.8 | **JWT secrets** are ≥256-bit random, rotated, stored in env vars | ⬜ NOT YET BUILT |
| 4.9 | **JWT expiry** set to ≤1 hour for access tokens | ⬜ NOT YET BUILT |
| 4.10 | **Email OTP verification** on sign-up — 6-digit, expires in 10 minutes | ⬜ NOT YET BUILT |
| 4.11 | **Password reset tokens** are single-use, expire in 15 minutes | ⬜ NOT YET BUILT |
| 4.12 | **Auth secrets never exposed** in frontend JS bundles or API responses | ⬜ NOT YET BUILT |
| 4.13 | **CSRF protection** on all state-changing endpoints | ⬜ NOT YET BUILT |
| 4.14 | **All auth events logged**: login success, login failure, logout, password reset | ⬜ NOT YET BUILT |

---

## 5. 🚪 Authorization & Access Control (IDOR Prevention)

> **Current state:** No backend/API. Required before any user data endpoints are built.

| # | Requirement | Status |
|---|------------|--------|
| 5.1 | **Every API request** verifies the authenticated user's identity server-side | ⬜ NOT YET BUILT |
| 5.2 | **Resource ownership checked** before read/update/delete (prevent IDOR) | ⬜ NOT YET BUILT |
| 5.3 | **Order IDs** are non-sequential UUIDs (not guessable integers) | ⬜ NOT YET BUILT |
| 5.4 | **User A cannot access User B's orders**, addresses, or profile data | ⬜ NOT YET BUILT |
| 5.5 | **Admin routes** are protected by a separate role check, not just auth | ⬜ NOT YET BUILT |
| 5.6 | **Principle of least privilege**: API keys have only minimum required permissions | ⬜ NOT YET BUILT |
| 5.7 | Database queries use **parameterized statements** / ORM — never string concatenation | ⬜ NOT YET BUILT |

**Template — ownership check pattern (Node.js / Express):**
```js
// ✅ CORRECT — always verify ownership
app.get('/api/orders/:id', requireAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json(order);
});

// ❌ WRONG — no ownership check (IDOR vulnerability)
app.get('/api/orders/:id', requireAuth, async (req, res) => {
  const order = await Order.findById(req.params.id); // any user can get any order
  res.json(order);
});
```

---

## 6. 📊 Logging & Anomaly Detection

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 6.1 | **Console.log stripped** from production builds | ✅ DONE | No sensitive data logged; static site |
| 6.2 | **Auth attempt logging** (success, failure, IP, timestamp, user agent) | ⬜ TODO | Required when auth is built |
| 6.3 | **Rate limit violations logged** with IP and account | ⬜ TODO | Required when backend is added |
| 6.4 | **API error logging** (4xx, 5xx) with request context but no secrets | ⬜ TODO | Required when API is added |
| 6.5 | **Unusual traffic patterns** flagged (many requests from one IP, scraping) | ⬜ TODO | Use Cloudflare or server-side middleware |
| 6.6 | **Payment events logged** (attempt, success, failure, refund) | ⬜ TODO | Required when payment integration is added |
| 6.7 | **Logs are stored server-side** — never sent to the browser | ⬜ TODO | Required when backend is added |
| 6.8 | **Log retention policy** defined (90 days minimum for security events) | ⬜ TODO | Required before launch |

---

## 7. 🍪 Frontend-Specific Security

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 7.1 | **Content-Security-Policy meta tag** restricts inline scripts and unknown sources | ✅ DONE | Set in `index.html` `<head>` |
| 7.2 | **`localStorage` stores no sensitive data** — only cart and cookie consent | ✅ DONE | Cart items (non-sensitive) and `sg-cookie-consent` flag only |
| 7.3 | **No sensitive data in `sessionStorage`** | ✅ DONE | Nothing sensitive stored |
| 7.4 | **XSS-safe DOM manipulation**: user data → `textContent`, never `innerHTML` | ✅ DONE | Code review confirms this |
| 7.5 | **External scripts** loaded from trusted CDNs only | ✅ DONE | Only Google Fonts + GSAP CDN |
| 7.6 | **Open redirects** not possible via URL params | ✅ DONE | No URL params control navigation |
| 7.7 | **Clickjacking**: `X-Frame-Options` set or CSP `frame-ancestors` defined | ⬜ TODO | Needs server-level header |
| 7.8 | **Cookie consent implemented** per GDPR — no analytics loaded before consent | ✅ DONE | Cookie banner implemented; note: analytics must NOT be loaded until accepted |
| 7.9 | **SRI hashes** on third-party CDN resources | ⬜ TODO | Add `integrity` attribute to GSAP CDN `<script>` tag |

---

## 8. 🗃️ Data Security & Privacy

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 8.1 | **Privacy Policy** accessible and accurate | ✅ DONE | Modal with full GDPR-compliant content |
| 8.2 | **Terms & Conditions** accessible | ✅ DONE | Modal with full legal terms |
| 8.3 | **Cookie consent** implemented before setting non-essential cookies | ✅ DONE | Implemented — analytics must respect this |
| 8.4 | **Minimum data collection**: only collect what's needed | ✅ DONE | Contact form collects name/email/message only |
| 8.5 | **User data deletion** path exists (GDPR Right to Erasure) | ⬜ TODO | Email flow defined in Privacy Policy; needs backend implementation |
| 8.6 | **Payment card data never stored** — handled exclusively by payment processor | ⬜ N/A | Payment not built yet |

---

## 9. ⚡ Immediate Action Items (Priority Order)

These must be done **before the site goes live on a public domain:**

1. **[ ] Add `maxlength` attributes** to all contact form input fields in `index.html`
2. **[ ] Add SRI hash** to GSAP CDN `<script>` tag in `index.html`
3. **[ ] Create `.gitignore`** including `.env`, `node_modules`, `*.log`, `*.key`
4. **[ ] Configure hosting platform** (Netlify / Vercel) to enforce HTTPS redirect
5. **[ ] Add security headers** (HSTS, X-Frame-Options, etc.) at CDN/server level
6. **[ ] Scan git history** for any accidentally committed secrets before first public push
7. **[ ] Do not load analytics** until cookie consent is explicitly accepted (wire to JS)

---

## 10. 🔄 Change Review Protocol

**Before every code change:**
- [ ] Does this change read/write user data? → Check sections 3, 5
- [ ] Does this change add a new form or input? → Check section 3
- [ ] Does this change add a new script or external resource? → Check 2, 7
- [ ] Does this change touch auth or sessions? → Check section 4 fully
- [ ] Does this change add a new API endpoint? → Check sections 4, 5, 6

**Security review sign-off:**
All changes that affect user data, auth, payments, or external integrations require a security review before merging.

---

*Maintained by StreetGloss development team. Questions → security@streetgloss.in*
