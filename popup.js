document.addEventListener('DOMContentLoaded', () => {
  const blockYouTubeCheckbox = document.getElementById('blockYouTube');
  const blockLinkedInCheckbox = document.getElementById('blockLinkedIn');
  const blockRedditCheckBox = document.getElementById('blockReddit');
  const saveBtn = document.getElementById('saveBtn');

 //Load saved Preferences
 chrome.storage.sync.get(['blockYouTube', 'blockLinkedIn','blockReddit'],(result) =>{
     blockYouTubeCheckbox.checked = result.blockYouTube || false;
     blockLinkedInCheckbox.checked = result.blockLinkedIn || false;
     blockRedditCheckBox.checked = result.blockReddit || false;
 });

  // Save preferences when button is clicked
saveBtn.addEventListener('click', () => {
  const blockYouTube = blockYouTubeCheckbox.checked;
  const blockLinkedIn = blockLinkedInCheckbox.checked;
  const blockReddit = blockRedditCheckBox.checked;
  alert('Preferences saved');
  chrome.storage.sync.set({ blockYouTube, blockLinkedIn, blockReddit }, () => {
    console.log('Preferences saved');
  });
});

});
