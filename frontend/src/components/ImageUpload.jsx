import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, X, Loader } from 'lucide-react';
import { emissionAPI } from '../utils/api';

const ImageUpload = ({ onAnalysisComplete }) => {
  const [uploadType, setUploadType] = useState('file'); // 'file' or 'url'
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url) {
      setPreview(url);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImageUrl('');
    setPreview(null);
    setImageName('');
  };

  const compressImage = (file, maxWidth = 1024, maxHeight = 1024, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 with compression
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;

      if (uploadType === 'file' && imageFile) {
        // Compress image before sending
        const compressedBase64 = await compressImage(imageFile, 1024, 1024, 0.7);

        result = await emissionAPI.analyzeImage(
          compressedBase64,
          imageName || imageFile.name,
          location,
          notes
        );
      } else if (uploadType === 'url' && imageUrl) {
        result = await emissionAPI.analyzeImageUrl(
          imageUrl,
          imageName || 'Image from URL',
          location,
          notes
        );
      } else {
        throw new Error('Please provide an image');
      }

      // Call parent callback with results
      if (onAnalysisComplete) {
        onAnalysisComplete(result.data);
      }

      // Reset form
      clearImage();
      setLocation('');
      setNotes('');
      setImageName('');
    } catch (err) {
      setError(err.message || 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-6">
      <h3 className="text-xl font-bold text-white mb-4">Upload Mining Image</h3>

      {/* Upload Type Toggle */}
      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => {
            setUploadType('file');
            clearImage();
          }}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition ${
            uploadType === 'file'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setUploadType('url');
            clearImage();
          }}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition ${
            uploadType === 'url'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          <span>Image URL</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Upload Area */}
        {uploadType === 'file' ? (
          <div>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-900/50 hover:bg-gray-900 transition"
            >
              {preview ? (
                <div className="relative w-full h-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      clearImage();
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-600 rounded-full hover:bg-red-700"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-12 h-12 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
                </div>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={handleUrlChange}
              className="block w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {preview && (
              <div className="mt-4 relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-contain rounded-lg bg-gray-900"
                  onError={() => {
                    setPreview(null);
                    setError('Failed to load image from URL');
                  }}
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-1 bg-red-600 rounded-full hover:bg-red-700"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Additional Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Image Name
          </label>
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            placeholder="e.g., Mine Site A - Jan 2025"
            className="block w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., East Wing, Sector 3"
            className="block w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional observations..."
            rows="3"
            className="block w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (!imageFile && !imageUrl)}
          className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2 h-5 w-5" />
              Analyzing...
            </>
          ) : (
            'Analyze Image'
          )}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
