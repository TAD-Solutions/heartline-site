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
- Navy ink #1A306F, pink #F07BA8, cream #F5EFE6, black #0B0B0C. Headlines are Cormorant Garamond italic, body is Inter, labels are Poppins caps.
- Never put navy ink alone on black. The logo files in `assets/` are final; do not recolour them.
- No prices anywhere on the site. Corporate films carry a "Coming soon" tag.
- Never use the em dash character; use a hyphen. Placeholders in form fields are short examples, never instructions.

## Media
- Photos go in `media/`, under 1 MB each, referenced by filename. Expected: `media/portrait-rania.jpg` (4:5), `media/team-1.jpg` and `media/team-2.jpg` (3:2). Remove the `awaiting` class and the "Photo to be added" tag from the frame when the photo lands.
- Films are Vimeo embeds. Replace `VIMEO_ID_PENDING` in `film.html` with the video ID and remove the `is-pending` class on the frame.
- The hero loop is `media/hero.mp4` and `media/hero.webm`; replace both when real footage exists.

## Pending configuration (Baron adds these)
- Web3Forms access key, replacing `WEB3FORMS_KEY_PENDING` in `home.html` and `contact.html`, so the forms deliver to rania@heartline.productions.
- Booking link for the Book a Call block in `contact.html`.
- LinkedIn URL in the footer of every page.
Never paste keys or passwords into any file.
