const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const progressBar = document.getElementById('progressBar');

// Open file input when 'Browse' button is clicked
browseBtn.addEventListener('click', () => fileInput.click());

// Handle file input selection
fileInput.addEventListener('change', () => handleFiles(fileInput.files));

// Handle drag-and-drop events
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('active');
});
dropArea.addEventListener('dragleave', () => dropArea.classList.remove('active'));
dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('active');
  handleFiles(e.dataTransfer.files);
});

// Function to handle files and start the upload process
function handleFiles(files) {
  if (files.length > 0) {
    simulateUpload(files[0]); // Simulate upload for the first file
  } else {
    alert('No file selected. Please choose a file.');
  }
}

// Simulate file upload and update the progress bar
function simulateUpload(file) {
  const totalSize = file.size;
  let uploaded = 0;

  const interval = setInterval(() => {
    uploaded += totalSize * 0.1; // Simulate upload progress
    const percent = Math.min(100, (uploaded / totalSize) * 100);
    progressBar.style.width = `${percent}%`;

    if (percent >= 100) {
      clearInterval(interval);
      alert(`${file.name} uploaded successfully!`); // Show success alert
    }
  }, 300);
}
