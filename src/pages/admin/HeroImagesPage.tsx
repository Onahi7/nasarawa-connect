import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import { adminAPI } from "@/services/adminAPI";
import { useHeroImages } from "@/hooks/useHeroImages";
import { Plus, Edit, Trash2, Upload, ImageIcon } from "lucide-react";

const HeroImagesPage = () => {
  const { toast } = useToast();
  const { images, refetch } = useHeroImages();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    call_to_action_text: "",
    call_to_action_url: "",
    display_order: 1
  });

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const imageUrl = await adminAPI.uploadImage(file);
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.image_url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.subtitle,
        imageUrl: formData.image_url,
        displayOrder: formData.display_order,
        ...(formData.call_to_action_text && {
          callToAction: {
            text: formData.call_to_action_text,
            url: formData.call_to_action_url || "#"
          }
        })
      };

      if (editingImage) {
        await adminAPI.updateHeroImage(editingImage._id, payload);
      } else {
        await adminAPI.createHeroImage(payload);
      }

      toast({
        title: "Success",
        description: `Hero image ${editingImage ? 'updated' : 'created'} successfully`,
      });

      resetForm();
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save hero image",
        variant: "destructive",
      });
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero image?")) return;

    try {
      await adminAPI.deleteHeroImage(id);
      toast({
        title: "Success",
        description: "Hero image deleted successfully",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete hero image",
        variant: "destructive",
      });
    }
  };

  const startEdit = (image: any) => {
    setEditingImage(image);
    setFormData({
      title: image.title || '',
      subtitle: image.description || '',
      image_url: image.imageUrl || '',
      call_to_action_text: image.callToAction?.text || '',
      call_to_action_url: image.callToAction?.url || '',
      display_order: image.displayOrder || 1
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setEditingImage(null);
    setIsCreating(false);
    setFormData({
      title: "",
      subtitle: "",
      image_url: "",
      call_to_action_text: "",
      call_to_action_url: "",
      display_order: 1
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hero Images</h1>
            <p className="text-gray-500">Manage homepage carousel images and content</p>
          </div>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-napps-blue hover:bg-napps-blue/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hero Image
          </Button>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle>{editingImage ? 'Edit' : 'Add New'} Hero Image</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Hero image title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      min="1"
                      value={formData.display_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Textarea
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Hero image subtitle or description"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Hero Image *</Label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={formData.image_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                        placeholder="Image URL or upload file below"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? 'Uploading...' : 'Upload'}
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />
                    {formData.image_url && (
                      <div className="border rounded-lg p-2 bg-gray-50">
                        <img 
                          src={formData.image_url} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="call_to_action_text">CTA Button Text</Label>
                    <Input
                      id="call_to_action_text"
                      value={formData.call_to_action_text}
                      onChange={(e) => setFormData(prev => ({ ...prev, call_to_action_text: e.target.value }))}
                      placeholder="Learn More"
                    />
                  </div>
                  <div>
                    <Label htmlFor="call_to_action_url">CTA Button URL</Label>
                    <Input
                      id="call_to_action_url"
                      value={formData.call_to_action_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, call_to_action_url: e.target.value }))}
                      placeholder="/about"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-napps-green hover:bg-napps-green/90" disabled={uploading}>
                    {uploading ? 'Uploading...' : (editingImage ? 'Update' : 'Create')} Hero Image
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image: any) => (
            <Card key={image._id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <img 
                  src={image.imageUrl} 
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                    )}
                    {image.callToAction?.text && (
                      <p className="text-xs text-blue-600 mb-2">CTA: {image.callToAction.text}</p>
                    )}
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>Order: {image.displayOrder}</span>
                      <span className={`px-2 py-1 rounded ${image.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {image.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(image)}
                      className="p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteImage(image._id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {images.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hero images yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first hero image for the homepage carousel.</p>
              <Button 
                onClick={() => setIsCreating(true)}
                className="bg-napps-blue hover:bg-napps-blue/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Hero Image
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default HeroImagesPage;