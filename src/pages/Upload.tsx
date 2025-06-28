
import React, { useState } from 'react';
import { Camera, X } from 'phosphor-react';
import { Button } from '@/components/ui/button';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && title) {
      // TODO: Implement upload logic
      console.log('Uploading:', { file: selectedFile, title, description });
      // Reset form
      setSelectedFile(null);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="h-screen bg-black text-white p-4 pb-20">
      <div className="flex items-center justify-between mb-6 pt-4">
        <h1 className="text-xl font-bold">Upload Video</h1>
      </div>

      <div className="space-y-6">
        {/* File upload area */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
          {selectedFile ? (
            <div className="space-y-4">
              <video 
                src={URL.createObjectURL(selectedFile)}
                className="w-full max-h-64 rounded-lg"
                controls
              />
              <Button
                onClick={() => setSelectedFile(null)}
                variant="outline"
                size="sm"
                className="text-red-400 border-red-400"
              >
                <X size={16} className="mr-2" />
                Remove
              </Button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Camera size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Tap to select video</p>
            </label>
          )}
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              placeholder="What's happening in your video?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white h-24 resize-none"
              placeholder="Tell viewers more about your video..."
            />
          </div>
        </div>

        {/* Upload button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !title}
          className="w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-black font-semibold py-3"
        >
          Upload Video
        </Button>
      </div>
    </div>
  );
};

export default Upload;
