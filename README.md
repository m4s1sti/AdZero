# AdZero

A high-performance, minimalist Google Chrome extension (Manifest V3) designed to block tracking requests at the network layer and eliminate intrusive web banners and YouTube video ads in real-time.

## Features
- **Manifest V3 Compliant**: Built using modern Chrome extension standards.
- **Declarative Net Request**: Intercepts and blocks high-frequency tracking and ad domain requests before they load.
- **YouTube Ad Optimizer**: Automatically skips video ads, mutes, and accelerates mandatory playback while hiding companion banners.
- **Dynamic DOM Cleaner**: Scans single-page applications (SPAs) to collapse ad containers instantly.
- **Lightweight Control GUI**: Classic popup interface with a master toggle switch and live blocked-item counter.

## Tech Stack
- **JavaScript (ES6+)**
- **Chrome Extension APIs** (`declarativeNetRequest`, `storage`, `scripting`)
- **HTML5 / CSS3**

## Installation (Local Developer Mode)
1. Clone or download this repository (make sure to exclude local browser metadata).
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the project directory.
