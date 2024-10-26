const fileList = document.getElementById('fileList');

async function loadFiles() {
  try {
    const files = await getFiles();

    if (files.length === 0) {
      fileList.textContent = 'No files uploaded.';
      return;
    }

    files.forEach((fileEntry) => {
      const { name, data } = fileEntry;
      const fileURL = URL.createObjectURL(data);

      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      fileItem.innerHTML = `
        <p>${name}</p>
        <a href="${fileURL}" download="${name}" class="btn">Download</a>
      `;
      fileList.appendChild(fileItem);
    });
  } catch (error) {
    console.error('Error loading files:', error);
    fileList.textContent = 'Failed to load files.';
  }
}

loadFiles();
