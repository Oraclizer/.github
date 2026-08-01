<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="profile/oraclizer_logo.svg">
  <source media="(prefers-color-scheme: light)" srcset="profile/oraclizer_logo_black.svg">
  <img alt="Oraclizer" src="profile/oraclizer_logo_black.svg" width="300">
</picture>

### Organization profile and repository defaults

[**Organization overview**](https://github.com/Oraclizer) ·
[**Website**](https://oraclizer.io) ·
[**Research**](https://research.oraclizer.io) ·
[**Documentation**](https://docs.oraclizer.io)

[![Repository health](https://github.com/Oraclizer/.github/actions/workflows/repository-health.yml/badge.svg)](https://github.com/Oraclizer/.github/actions/workflows/repository-health.yml)
[![License: BSD-3-Clause](https://img.shields.io/badge/license-BSD--3--Clause-0b5cad.svg)](LICENSE)

</div>

This public `.github` repository controls two distinct surfaces:

1. [`profile/README.md`](profile/README.md) is rendered on the public
   Oraclizer organization overview.
2. The root community-health files and `.github` templates provide fallback
   contribution guidance for Oraclizer repositories that do not define a
   repository-specific policy.

Repository-specific files always take precedence over these defaults.

## Repository map

| Path | Purpose |
| --- | --- |
| [`profile/README.md`](profile/README.md) | Public organization profile and project-status map |
| [`profile/assets/`](profile/assets/) | Responsive architecture and social-preview assets |
| [`SECURITY.md`](SECURITY.md) | Coordinated vulnerability-reporting boundary |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Default contribution and review expectations |
| [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) | Participation and enforcement expectations |
| [`SUPPORT.md`](SUPPORT.md) | Support, issue, and security channel separation |
| [`GOVERNANCE.md`](GOVERNANCE.md) | Maintenance, merge, and release policy for this repository |
| [`.github/`](.github/) | CODEOWNERS, issue forms, Pull Request template, Dependabot, and Continuous Integration |
| [`scripts/verify-profile.mjs`](scripts/verify-profile.mjs) | Dependency-free public-surface verification |

## Public-surface contract

Changes must keep repository visibility, protocol status, research status,
assurance boundaries, and links consistent with the underlying public
artifacts. A green repository-health check validates the structure of this
surface; it does not establish a deployment, audit, legal conclusion,
operational-security claim, or model-to-code refinement.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change. Report
sensitive concerns through [SECURITY.md](SECURITY.md), never through a public
issue or Pull Request.

## License

The files in this repository are licensed under the
[BSD 3-Clause License](LICENSE). A repository that inherits community-health
guidance from here remains governed by its own license.
