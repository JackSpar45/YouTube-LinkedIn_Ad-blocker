console.log("Content script running on Reddit"); 
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
      //console.log('Fast-forwarding and muting ad');
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

// Function to remove Reddit Ads
function removeRedditAds() {
  //console.log("Running removeRedditAds...");

  // Remove promoted labels first
  document.querySelectorAll('.promoted-label.text-neutral-content-weak.font-normal.truncate').forEach(label => {
    //console.log("Found promoted label!", label);
    const parentPost = label.closest('[id^="t3_"]');
    if (parentPost) {
      //console.log("Removing post:", parentPost);
      parentPost.style.display = 'none';
    }
  });

  // Remove posts containing <shreddit-dynamic-ad-link>
  document.querySelectorAll('shreddit-dynamic-ad-link').forEach(ad => {
    //console.log("Found Reddit dynamic ad!", ad);
    const parentPost = ad.closest('[id^="t3_"]');
    if (parentPost) {
      //console.log("Removing post:", parentPost);
      parentPost.style.display = 'none'; 
    }
  });

  // Remove sidebar and other ads
  document.querySelectorAll('[data-testid="ad-unit"], [data-test-id="ad-slot"]').forEach(ad => {
    //console.log("Removing sidebar ads...");
    ad.style.display = 'none';
  });

  //console.log("Finished executing removeRedditAds.");
}

window.removeRedditAds = removeRedditAds;


//------------------------->

chrome.storage.sync.get(['blockYouTube','blockLinkedIn','blockReddit'],(result) =>{
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

   if (result.blockReddit && location.hostname.includes('reddit.com')) {
    document.addEventListener('DOMContentLoaded', removeRedditAds);
    const observer = new MutationObserver(mutations => {
      //console.log("Mutation detected...", mutations);
      mutations.forEach(() => removeRedditAds());
    });
    observer.observe(document.body, { childList: true, subtree: true });

    setInterval(removeRedditAds, 2000);
    
  }

 
});

