// Advanced Dynamic Ad Blocker with Toggle State

const AD_SELECTORS = [
  '.ad-container',
  '.ad-wrapper',
  '.ad-banner',
  '.adsbygoogle',
  'iframe[src*="doubleclick.net"]',
  'ytd-companion-slot-renderer',
  'ytd-action-companion-ad-renderer',
  'ytd-display-ad-renderer',
  'div[id^="google_ads"]'
];

let adblockEnabled = true;

// Storage'dan durum bilgisi oku
chrome.storage.local.get(['adblockEnabled'], (data) => {
  adblockEnabled = data.adblockEnabled !== false;
});

// Storage değişirse dinamik olarak durumu güncelle
chrome.storage.onChanged.addListener((changes) => {
  if (changes.adblockEnabled) {
    adblockEnabled = changes.adblockEnabled.newValue;
  }
});

function cleanDOM() {
  if (!adblockEnabled) return; // Duraklatıldıysa işlem yapma

  let foundNewAds = 0;

  AD_SELECTORS.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (el.style.display !== 'none') {
        el.style.setProperty('display', 'none', 'important');
        foundNewAds++;
      }
    });
  });

  // YouTube özel atlama mekanizması
  if (window.location.hostname.includes("youtube.com")) {
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern');
    if (skipButton) {
      skipButton.click();
      foundNewAds++;
    }

    const video = document.querySelector('video');
    const adOverlay = document.querySelector('.ad-showing, .ytp-ad-player-overlay');
    
    if (adOverlay && video) {
      video.playbackRate = 16.0;
      video.muted = true;
      try {
        video.currentTime = video.duration;
      } catch (e) {}
    }
  }

  // Sayaç güncelleme
  if (foundNewAds > 0) {
    chrome.storage.local.get(['blockedCount'], (data) => {
      const current = data.blockedCount || 0;
      chrome.storage.local.set({ blockedCount: current + foundNewAds });
    });
  }
}

setInterval(cleanDOM, 500);