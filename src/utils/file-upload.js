/**
 * File upload utilities
 * Handles file selection, display, and removal
 */
import { $ } from './dom.js';

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file icon based on file type
 * @param {string} fileName - Name of the file
 * @returns {string} Emoji icon
 */
function getFileIcon(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  const icons = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    txt: '📋'
  };
  return icons[ext] || '📎';
}

/**
 * Initialize file upload functionality
 * @param {HTMLFormElement} form - Form element
 */
export function initFileUpload(form) {
  if (!form) return;

  const fileInput = form.querySelector('input[type="file"]');
  const fileList = $('#file-list');
  const fileUploadWrapper = form.querySelector('.file-upload-wrapper');
  const fileUploadLabel = form.querySelector('.file-upload-label');

  if (!fileInput || !fileList) return;

  // Store selected files
  let selectedFiles = [];

  /**
   * Update file list display
   */
  function updateFileList() {
    if (selectedFiles.length === 0) {
      fileList.innerHTML = '';
      fileUploadWrapper?.classList.remove('has-files');
      if (fileUploadLabel) {
        fileUploadLabel.querySelector('.file-upload-text').textContent = 'Choose files or drag them here';
      }
      return;
    }

    fileUploadWrapper?.classList.add('has-files');
    if (fileUploadLabel) {
      fileUploadLabel.querySelector('.file-upload-text').textContent = 
        `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`;
    }

    fileList.innerHTML = selectedFiles.map((file, index) => `
      <div class="file-list-item" role="listitem">
        <div class="file-list-item-info">
          <span class="file-list-item-icon">${getFileIcon(file.name)}</span>
          <span class="file-list-item-name" title="${file.name}">${file.name}</span>
          <span class="file-list-item-size">${formatFileSize(file.size)}</span>
        </div>
        <button 
          type="button" 
          class="file-list-item-remove" 
          aria-label="Remove ${file.name}"
          data-index="${index}"
        >
          ×
        </button>
      </div>
    `).join('');

    // Add remove button handlers
    fileList.querySelectorAll('.file-list-item-remove').forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        selectedFiles.splice(index, 1);
        
        // Update the file input
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
        
        updateFileList();
      });
    });
  }

  /**
   * Handle file selection
   */
  function handleFiles(files) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'text/plain'
    ];

    Array.from(files).forEach(file => {
      // Check file size
      if (file.size > maxSize) {
        alert(`File "${file.name}" exceeds 10MB limit and was not added.`);
        return;
      }

      // Check file type
      if (!allowedTypes.includes(file.type)) {
        alert(`File "${file.name}" is not an accepted format and was not added.`);
        return;
      }

      // Check if file already exists
      if (selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
        return; // Skip duplicate
      }

      selectedFiles.push(file);
    });

    // Update the file input
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;

    updateFileList();
  }

  // Handle file input change
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  });

  // Handle drag and drop
  if (fileUploadLabel) {
    fileUploadLabel.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileUploadLabel.style.borderColor = 'var(--accent)';
      fileUploadLabel.style.background = 'rgba(166,124,82,0.1)';
    });

    fileUploadLabel.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileUploadLabel.style.borderColor = '';
      fileUploadLabel.style.background = '';
    });

    fileUploadLabel.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileUploadLabel.style.borderColor = '';
      fileUploadLabel.style.background = '';

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    });
  }
}

