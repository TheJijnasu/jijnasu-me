# jijnasu.me

Public-facing site for **Jijnāsu** — the translator/publisher identity behind
the English-only reading editions of public-domain Sanskrit manuscripts
produced in the `ancient-god` pipeline. Static HTML, no build step, no
dependencies.

## Pages

- `index.html` — book list and about-the-project blurb
- `errata.html` — reported corrections per book
- `contact.html` — contact email

## Deploying (GitHub Pages)

1. Push this repo to GitHub (public repo, e.g. `jijnasu/jijnasu.github.io`
   or any name — GitHub Pages doesn't require the `.github.io` naming
   convention once a custom domain is set via `CNAME`).
2. Repo Settings → Pages → Source: deploy from the `main` branch, root (`/`).
3. Once `jijnasu.me` is claimed, add these DNS records at the registrar
   (Namecheap → Domain List → Manage → Advanced DNS):
   - Four `A` records for the apex (`@`) pointing at GitHub Pages' IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` → `<github-username>.github.io`
4. In the repo's Pages settings, set the custom domain to `jijnasu.me` and
   enable "Enforce HTTPS" once it's available (GitHub provisions the
   certificate automatically after the DNS records above resolve).
5. `CNAME` file in this repo root (already present, contains `jijnasu.me`)
   is what tells GitHub Pages which custom domain to serve — don't remove it,
   GitHub Pages rewrites/needs it on every push.

## Email

`contact@jijnasu.me` is set up as free mail forwarding at the registrar
(Namecheap → Domain List → Manage → Private Email / Forwarding), not a
real hosted inbox — mail forwards to an existing address. No code here
handles email.

## Updating the book list

Edit the `<div class="book">` block in `index.html` directly — plain HTML,
no CMS. Add a new block per title, same structure, when a new edition
ships.
