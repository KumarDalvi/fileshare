const DB_NAME = 'fileStorage';
const STORE_NAME = 'files';

// Open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log('Object store created.');
      }
    };

    request.onsuccess = (event) => {
      console.log('Database opened successfully.');
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('Error opening database:', event.target.error);
      reject(event.target.error);
    };
  });
}

// Add a file to IndexedDB
function addFile(file) {
  return openDB().then((db) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const fileData = {
      name: file.name,
      data: file, // Store as Blob
    };

    const request = store.add(fileData);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        console.log(`File "${file.name}" added successfully.`);
        resolve();
      };
      request.onerror = (event) => {
        console.error('Error adding file:', event.target.error);
        reject(event.target.error);
      };
    });
  });
}

// Retrieve all files from IndexedDB
function getFiles() {
  return openDB().then((db) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        console.log('Files retrieved:', event.target.result);
        resolve(event.target.result || []);
      };
      request.onerror = (event) => {
        console.error('Error retrieving files:', event.target.error);
        reject(event.target.error);
      };
    });
  });
}
