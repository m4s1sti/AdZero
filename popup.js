document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const statusLabel = document.getElementById('status-label');
  const blockedCountEl = document.getElementById('blocked-count');

  // Mevcut durumu yükle
  chrome.storage.local.get(['adblockEnabled', 'blockedCount'], (data) => {
    const isEnabled = data.adblockEnabled !== false; // Varsayılan: true
    toggleBtn.checked = isEnabled;
    statusLabel.textContent = isEnabled ? "Protection: ON" : "Protection: OFF";
    statusLabel.style.color = isEnabled ? "#2e7d32" : "#c62828";
    
    blockedCountEl.textContent = data.blockedCount || 0;
  });

  // Duraklat / Aktifleştir anahtarı
  toggleBtn.addEventListener('change', () => {
    const isEnabled = toggleBtn.checked;
    chrome.storage.local.set({ adblockEnabled: isEnabled }, () => {
      statusLabel.textContent = isEnabled ? "Protection: ON" : "Protection: OFF";
      statusLabel.style.color = isEnabled ? "#2e7d32" : "#c62828";
      
      // Etkin sekmeyi yenile ki değişiklik anında uygulansın
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });
});