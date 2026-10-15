# Heartline Productions website

This repo is the live website at https://heartline.productions. It is static HTML with no build step. URLs are clean: `about.html` is served at /about (vercel.json cleanUrls), and links between pages are written as `/about`, never `about.html`. Pushing to `main` deploys to production on Vercel within about a minute.

## Pages
| Page | File |
|---|---|
| Front page today (coming soon animation) | `index.html` |
| Home page of the full site | `home.html` |
| Films | `films.html` |
| One film (case study template) | `film.html` |
| About | `about.html` |
| Testimonials | `testimonials.html` |
| Contact | `contact.html` |

`index.html` stays the coming-soon page on purpose. The full site is reached at /home until Rania decides to switch the front page; when she does, copy `home.html` over `index.html` and update the links from `home.html` to `index.html` in every page.

## How to work here
- Edit copy directly in the page files. Text sits between tags such as `<p>` and `</p>`; change the words, not the tags.
- Blocks marked `<!-- DRAFT: replace -->` are placeholder copy. Replace them with Rania's words and delete the comment.
- Commit with a plain one-line message and push to `main`. There is no build, no test suite and no deploy command to run.
- After pushing, check the page at https://heartline.productions/<page>.

## Do not touch without being asked
`assets/site.css`, `assets/site.js` and `assets/intro.js` hold the design, the motion and the logo opening for every page. Change them only when the request is explicitly about design or motion, and say what will change first.

## Brand rules
- Navy ink #1A306F, pink #F07BA8, cream #F5EFE6, black #0B0B0C.
- Never put navy ink alone on black. The logo files in `assets/` are final; do not recolour them.
- No prices anywhere on the site. Corporate films carry a "Coming soon" tag.
- Never use the em dash character; use a hyphen. Placeholders in form fields are short examples, never instructions.

## Typography
One system shared by every page, set in `assets/site.css`. Change it there so the pages stay in step; per-page overrides belong in that page's `<style>` block and must say which section they apply to.
- Headings, statements and list titles: Cormorant 600 upright. Not italic.
- Body and description copy: Rubik 400, clamp(15px,1.4vw,18px), line-height 1.65, colour rgba(255,255,255,.78).
- Section eyebrows (`p.label`): Poppins 600, 24px, track .2em, uppercase, pink. Inline labels (`span.label`, `cite.label`, footer columns, contact channels) stay 13px at track .3em; keep them small or they compete with the copy.
- Homepage hero headline: Josefin Sans 400.
- Services list titles (`#services .list .t`, overridden in `home.html`): Poppins 500, clamp(22px,3.2vw,34px) so it reads 34px at the 1320px wrap, track .16em, uppercase, white. Picked from a font options comparison on 2026-10-15; the clamp floor of 22px is what keeps "Corporate films" on one line at 375px.
- Google Fonts links must match across pages. Every page loads Cormorant Garamond, Cormorant 600, Inter 300/400/500, Poppins 500/600, Josefin Sans and Rubik.

## Media
- Photos go in `media/`, under 1 MB each, referenced by filename. Expected: `media/portrait-rania.jpg` (4:5), `media/team-1.jpg` and `media/team-2.jpg` (3:2). Remove the `awaiting` class and the "Photo to be added" tag from the frame when the photo lands.
- Films are Vimeo embeds. Replace `VIMEO_ID_PENDING` in `film.html` with the video ID and remove the `is-pending` class on the frame.
- The hero loop is `media/hero.mp4` and `media/hero.webm`; replace both when real footage exists.

## Pending configuration (Baron adds these)
- Web3Forms access key, replacing `WEB3FORMS_KEY_PENDING` in `home.html` and `contact.html`, so the forms deliver to rania@heartline.productions.
- Booking link for the Book a Call block in `contact.html`.
- LinkedIn URL in the footer of every page.
Never paste keys or passwords into any file.
