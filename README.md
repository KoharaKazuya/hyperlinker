# HyperLinker

A simple Google Chrome extension creates hyperlinks from plain text on website.

## Installation

[Chrome Web Store][]

## Usage

HyperLinker provides two ways to create hyperlinks.

1.  Activate hyperlinks while pressing `ctrl` key (macOS: `command` key), and deactivate when releasing the key.
2.  At every click the HyperLinker icon (in chrome menu), toggle activate/deactivate hyperlinks.

## Bookmarklet Edition

HyperLinker bookmarklet activates hyperlinks. (no deactivate)

[Bookmarklet][]

## for Developers

### Generate Icons

Requirement: ImageMagick

```console
$ convert \
    -size 48x48  \
    -font "ArialB" \
    -background "#3F3FBF" \
    -fill "#FFFFFF"  \
    -gravity center \
    caption:"://" \
    png:src/assets/images/icon48_enabled.png
$ convert \
    -size 48x48  \
    -font "ArialB" \
    -background "#72728C" \
    -fill "#FFFFFF"  \
    -gravity center \
    caption:"://" \
    png:src/assets/images/icon48_disabled.png
```

[chrome web store]: TODO
[bookmarklet]: ./hyperlinker.bookmarklet
