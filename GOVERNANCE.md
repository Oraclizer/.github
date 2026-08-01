# Governance

This document governs the public `Oraclizer/.github` repository and the
organization-profile surface it renders. It is not a governance document for
an external protocol, standards body, deployed network, or asset.

## Maintainer authority

Oraclizer maintains this repository. Jay Kim (`@jay-oraclizer`) is the current
repository owner and review owner. The maintainer controls access, triage,
merge decisions, public-profile claims, repository settings, and security
coordination.

Opening an issue or Pull Request creates no obligation to accept, merge,
publish, release, or respond within a particular period.

## Decision principles

Changes are evaluated for:

1. factual consistency with public repositories, specifications, papers, and
   standards-process state;
2. explicit separation of research, specification, implementation, audit,
   release, and deployment status;
3. accessibility, stable navigation, and responsive rendering;
4. licensing, attribution, disclosure, and confidentiality boundaries;
5. reproducibility of the repository-health check;
6. minimal, reviewable history through Pull Requests.

## Merge policy

Changes use a topic branch and Pull Request. The repository-health workflow
must pass, review conversations must be resolved, and the default branch must
retain a linear history. Force pushes and deletion of the default branch are
not permitted.

A passing check validates repository structure only. It does not establish
the correctness or readiness of any project described by the profile.

## Tags and releases

This repository is an organization profile and policy surface, not a packaged
or deployable software product. It therefore does not create routine version
tags or GitHub Releases merely to mark documentation updates.

If this repository later distributes a versioned artifact, a tag and release
must identify an immutable commit, artifact scope, status, verification, and
change summary. Existing tags must never be moved or reused.

Visibility changes, protocol versions, paper publication, standards review,
audits, deployments, tags, and releases remain separate decisions.

## Amendments

Governance changes use the same Pull Request and review path and remain
traceable in Git history.
