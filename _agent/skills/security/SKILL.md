---
name: security
description: Security checklist and secure coding rules for every action in this repository.
---

## When to apply

Apply this skill whenever you are asked to:

- Build, change, or review backend/frontend code
- Add or change dependencies, environment variables, auth, or data flow
- Run analysis, audits, or hardening tasks

Keywords: `security`, `vulnerability`, `auth`, `token`, `cors`, `rate limit`, `injection`, `xss`, `csrf`, `ssrf`, `sql injection`, `audit`, `hardening`

## Mandatory execution rule

- Before **every action** (read, plan, code, refactor, test, release), validate the checklist below.
- If any checklist item fails, stop and correct the approach before proceeding.

## Security checklist (validate every action)

- [ ] Authentication and authorization checks are present for protected resources
- [ ] Input is validated and constrained at API boundaries
- [ ] No secrets are logged, hardcoded, or exposed in responses
- [ ] Sensitive tokens are handled safely (transport, storage, rotation strategy)
- [ ] Database operations avoid injection risks and enforce tenant/user boundaries
- [ ] CORS, cookies, and transport settings match the target environment securely
- [ ] Error handling avoids leaking internals to clients
- [ ] Dependency and third-party usage does not introduce known vulnerabilities
- [ ] Changes do not weaken existing security controls

## Secure coding conventions

- Prefer deny-by-default authorization and explicit access checks per resource.
- Use strict schema validation (`zod`/equivalent) for all untrusted input.
- Keep secrets only in environment variables or secret stores.
- Use least-privilege defaults in infrastructure and runtime configuration.
- Treat AI/model outputs as untrusted input and validate before persistence/execution.

## Self-Improvement

- If the user corrects a security requirement or checklist item, update this file immediately.
