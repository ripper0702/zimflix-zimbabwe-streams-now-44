
import React, { useState } from 'react';
import { Upload, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface UploadedMovie {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: string;
  videoFile: File;
  videoUrl: string;
  thumbnail?: string;
}

interface AdminUploadProps {
  onMovieUploaded: (movie: UploadedMovie) => void;
  uploadedMovies: UploadedMovie[];
}

const AdminUpload: React.FC<AdminUploadProps> = ({ onMovieUploaded, uploadedMovies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    year: '',
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid video file",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile || !formData.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a video file",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create a URL for the video file to play locally
      const videoUrl = URL.createObjectURL(videoFile);
      
      const newMovie: UploadedMovie = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        genre: formData.genre || 'Drama',
        year: formData.year || new Date().getFullYear().toString(),
        videoFile,
        videoUrl,
        thumbnail: `https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300`
      };

      onMovieUploaded(newMovie);
      
      // Reset form
      setFormData({ title: '', description: '', genre: '', year: '' });
      setVideoFile(null);
      setIsOpen(false);
      
      toast({
        title: "Movie Uploaded Successfully",
        description: `${formData.title} has been added to your library`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your movie",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">Admin Panel</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload Movie
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Movie</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Drama"
                  />
                </div>
                
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="2024"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="video">Video File *</Label>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
                {videoFile && (
                  <p className="text-sm text-green-400 mt-1">
                    Selected: {videoFile.name}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {uploadedMovies.length > 0 && (
        <div className="bg-gray-900/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Uploaded Movies ({uploadedMovies.length})</h3>
          <div className="space-y-2">
            {uploadedMovies.map((movie) => (
              <div key={movie.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                <div>
                  <h4 className="text-white font-medium">{movie.title}</h4>
                  <p className="text-gray-400 text-sm">{movie.genre} • {movie.year}</p>
                </div>
                <Play className="w-5 h-5 text-green-400" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUpload;
