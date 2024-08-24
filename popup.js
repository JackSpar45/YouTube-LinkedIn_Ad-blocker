document.addEventListener('DOMContentLoaded', () => {
    const blockYouTubeCheckbox = document.getElementById('blockYouTube');
    const blockLinkedInCheckbox = document.getElementById('blockLinkedIn');
    const saveBtn = document.getElementById('saveBtn');

   //Load saved Preferences
   chrome.storage.sync.get(['blockYouTube', 'blockLinkedIn'],(result) =>{
       blockYouTubeCheckbox.checked = result.blockYouTube || false;
       blockLinkedInCheckbox.checked = result.blockLinkedIn || false;
   });

    // Save preferences when button is clicked
  saveBtn.addEventListener('click', () => {
    const blockYouTube = blockYouTubeCheckbox.checked;
    const blockLinkedIn = blockLinkedInCheckbox.checked;
    alert('Preferences saved');
    chrome.storage.sync.set({ blockYouTube, blockLinkedIn }, () => {
      console.log('Preferences saved');
    });
  });


});