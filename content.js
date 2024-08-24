function removeYouTubeAds(){

  setInterval(() => {
    const video = document.querySelector(".video-stream.html5-main-video");
    if (!video) return;
  
    const skipButton = document.querySelector('.ytp-skip-ad-button');
    if (skipButton) {
      skipButton.click();
      console.log('Skipped ad');
    }
  
    const adContainer = document.querySelector('.video-ads.ytp-ad-module');
    if (adContainer && adContainer.children.length > 0) {
      video.playbackRate = 16;
      video.muted = true;
      console.log('Fast-forwarding and muting ad');
    }
  
    const rightTopAd = document.querySelector('ytd-companion-slot-renderer');
    if (rightTopAd) {
      rightTopAd.remove();
      //console.log('Removed right top ad');
    }
  
    const videoAd = document.querySelector('ytd-ad-slot-renderer');
    if (videoAd) {
      videoAd.remove();
      //console.log('Removed video ad');
    }
  }, 500); 
  
}

function removeLinkedInAds() {
  const adElements = document.querySelectorAll('.ad-banner-container, .feed-shared-update-v2');

  adElements.forEach(adElement => {
    const sponsoredTag = adElement.querySelector('.sponsored-tag, .ad-badge, [data-sponsored]');
    if (sponsoredTag || adElement.innerText.includes('Promoted') || adElement.innerText.includes('Sponsored')) {
       adElement.remove();
    }
  });
}


//------------------------->

chrome.storage.sync.get(['blockYouTube','blockLinkedIn'],(result) =>{
   if(result.blockYouTube){
    if(location.hostname.includes('youtube.com')){
        document.addEventListener('DOMContentLoaded',removeYouTubeAds);
        const observer = new MutationObserver(removeYouTubeAds);
        observer.observe(document.body, {childList:true, subtree:true});
    }
   }
   
   if(result.blockLinkedIn){
    if(location.hostname.includes('linkedin.com')){
        document.addEventListener('DOMContentLoaded', removeLinkedInAds);
        const observer = new MutationObserver(removeLinkedInAds);
        observer.observe(document.body, {childList:true, subtree:true});
    }
   }
 
});

