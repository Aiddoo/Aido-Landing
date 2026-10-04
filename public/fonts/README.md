# Aido fonts

Original Black Han Sans (Google Fonts v24, weight 400) and Noto Sans KR (Google Fonts v40, variable weights 400–700), served locally under the SIL Open Font License. See the two OFL files alongside these assets.

Source: Google's official CSS2 API, requested with `family=Black+Han+Sans&family=Noto+Sans+KR:wght@400..700&display=swap`. The WOFF2 bytes and Unicode coverage are unmodified; filenames include a SHA-256 content prefix. `src/app/fonts.css` retains Google's `unicode-range` declarations so browsers fetch only the subsets required by the page.

This removes Google Fonts network calls from builds and visitor requests. When updating fonts, fetch the official CSS and fonts, preserve the license files, regenerate the content-based names, and update the CSS URLs together.

English pages reuse the existing Latin subset files through `next/font/local`, with preload, generated fallback metrics and `display: optional` to prevent late font swaps. Korean pages retain the original subset CSS. Font binaries, Unicode coverage and licenses remain unchanged.
