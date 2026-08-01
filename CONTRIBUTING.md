# Contributing

This file provides fallback contribution guidance for Oraclizer repositories
that do not define their own `CONTRIBUTING.md`. Repository-specific guidance
and licenses take precedence.

## Choose the right channel

| Contribution | Channel |
| --- | --- |
| Broken link, rendering defect, accessibility problem, or documentation correction | Documentation issue form |
| Repository metadata, public-status, or navigation defect | Repository-surface issue form |
| Material protocol, proof, architecture, or public-claim change | Issue first, before a Pull Request |
| Sensitive or potentially exploitable concern | Private path in `SECURITY.md` |
| Usage or support request | Boundary and routing in `SUPPORT.md` |

Search existing issues before opening a new one. Keep each issue or Pull
Request to one reviewable concern.

## Pull Request expectations

A Pull Request should:

- explain what changed, why it changed, and which public surface is affected;
- link the review issue when the change is material or claim-affecting;
- distinguish research, specification, implementation, audit, release, and
  deployment status;
- include the smallest relevant verification result;
- preserve accessibility, relative links, and responsive rendering;
- contain no credentials, private correspondence, internal planning data,
  machine-local paths, generated logs, or unrelated artifacts;
- use the private reporting path for sensitive concerns.

For this `.github` repository, run:

```bash
node scripts/verify-profile.mjs
```

The check validates repository structure and public-surface invariants. It is
not a substitute for proof, code, deployment, security, or legal review.

## Contribution rights

By contributing to this `.github` repository, you represent that you have the
right to submit the material and agree that it may be distributed under the
BSD 3-Clause License. Contributions to another Oraclizer repository remain
subject to that repository's license and contribution policy.

Opening an issue or Pull Request creates no obligation to accept, merge,
publish, release, or respond within a particular period.
