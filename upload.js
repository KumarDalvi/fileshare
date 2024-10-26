const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const statusMessage = document.getElementById('statusMessage');
const progressBar = document.getElementById('progressBar');
const dropZone = document.getElementById('dropZone');

// Handle file input click
dropZone.addEventListener('click', () => fileInput.click());

// Handle drag-and-drop
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  fileInput.files = e.dataTransfer.files;
});

// Upload button click handler
uploadBtn.addEventListener('click', async () => {
  const files = fileInput.files;

  if (files.length === 0) {
    alert('Please select a file.');
    return;
  }

  progressBar.style.width = '0%';

  try {
    let uploaded = 0;
    for (const file of files) {
      await addFile(file); // Store each file in IndexedDB
      uploaded++;
      const progress = Math.round((uploaded / files.length) * 100);
      progressBar.style.width = `${progress}%`;
    }
    statusMessage.textContent = 'Files uploaded successfully!';
  } catch (error) {
    console.error('Error uploading files:', error);
    statusMessage.textContent = 'Error uploading files. Please try again.';
  }
});
