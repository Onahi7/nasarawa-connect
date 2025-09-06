import AdminLayout from "@/components/AdminLayout";import AdminLayout from "@/components/AdminLayout";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";import { Textarea } from "@                    <Button

import { useToast } from "@/hooks/use-toast";                      variant="ghost"

import { useState, useRef } from "react";                      size="sm"

import { adminAPI } from "@/services/adminAPI";                      onClick={() => startEdit(image)}

import { useHeroImages } from "@/hooks/useHeroImages";                      className="p-1"

import { Plus, Edit, Trash2, Upload, Eye, ImageIcon } from "lucide-react";                    >

                      <Edit className="w-4 h-4" />

type HeroImage = {                    </Button>

  _id: string;                    <Button

  title: string;                      variant="ghost"

  description?: string;                      size="sm"

  imageUrl: string;                      onClick={() => deleteImage(image._id)}

  callToAction?: {                      className="p-1 text-red-500 hover:text-red-700"

    text: string;                    >

    url: string;                      <Trash2 className="w-4 h-4" />

  };                    </Button>

  displayOrder: number;                  </div>

  isActive: boolean;                </div>

};              </CardContent>

            </Card>

const HeroImagesPage = () => {          ))}

  const { toast } = useToast();        </div>/textarea";

  const { images, refetch } = useHeroImages();import { useToast } from "@/hooks/use-toast";

  import { useState, useRef } from "react";

  const [isCreating, setIsCreating] = useState(false);import { adminAPI } from "@/services/adminAPI";

  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);import { useHeroImages } from "@/hooks/useHeroImages";

  const [uploading, setUploading] = useState(false);import { Plus, Edit, Trash2, Upload, Eye, ImageIcon } from "lucide-react";

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({type HeroImage = {

    title: "",  _id: string;

    subtitle: "",  title: string;

    image_url: "",  description?: string;

    call_to_action_text: "",  imageUrl: string;

    call_to_action_url: "",  callToAction?: {

    display_order: 1    text: string;

  });    url: string;

  };

  const handleFileUpload = async (file: File) => {  displayOrder: number;

    setUploading(true);  isActive: boolean;

    try {};

      const imageUrl = await adminAPI.uploadImage(file);

      setFormData(prev => ({ ...prev, image_url: imageUrl }));const HeroImagesPage = () => {

      toast({  const { toast } = useToast();

        title: "Success",  const { images, refetch } = useHeroImages();

        description: "Image uploaded successfully",  

      });  const [isCreating, setIsCreating] = useState(false);

    } catch (error) {  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);

      toast({  const [uploading, setUploading] = useState(false);

        title: "Error",  const fileInputRef = useRef<HTMLInputElement>(null);

        description: "Failed to upload image",  const [formData, setFormData] = useState({

        variant: "destructive",    title: "",

      });    subtitle: "",

    } finally {    image_url: "",

      setUploading(false);    call_to_action_text: "",

    }    call_to_action_url: "",

  };    display_order: 1

  });

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();  const handleFileUpload = async (file: File) => {

        setUploading(true);

    if (!formData.title || !formData.image_url) {    try {

      toast({      const imageUrl = await adminAPI.uploadImage(file);

        title: "Error",      setFormData(prev => ({ ...prev, image_url: imageUrl }));

        description: "Please fill in all required fields",      toast({

        variant: "destructive",        title: "Success",

      });        description: "Image uploaded successfully",

      return;      });

    }    } catch (error) {

      toast({

    try {        title: "Error",

      if (editingImage) {        description: "Failed to upload image",

        await adminAPI.updateHeroImage(editingImage._id, {        variant: "destructive",

          title: formData.title,      });

          description: formData.subtitle,    } finally {

          imageUrl: formData.image_url,      setUploading(false);

          callToAction: {    }

            text: formData.call_to_action_text,  };

            url: formData.call_to_action_url

          },  const handleSubmit = async (e: React.FormEvent) => {

          displayOrder: formData.display_order,    e.preventDefault();

        });    

        setEditingImage(null);    if (!formData.title || !formData.image_url) {

      } else {      toast({

        await adminAPI.createHeroImage({        title: "Error",

          title: formData.title,        description: "Please fill in all required fields",

          description: formData.subtitle,        variant: "destructive",

          imageUrl: formData.image_url,      });

          callToAction: {      return;

            text: formData.call_to_action_text,    }

            url: formData.call_to_action_url

          },    try {

          displayOrder: formData.display_order,      if (editingImage) {

        });        await adminAPI.updateHeroImage(editingImage._id, {

      }          title: formData.title,

          description: formData.subtitle,

      toast({          imageUrl: formData.image_url,

        title: "Success",          callToAction: {

        description: `Hero image ${editingImage ? 'updated' : 'created'} successfully`,            text: formData.call_to_action_text,

      });            url: formData.call_to_action_url

          },

      setFormData({          displayOrder: formData.display_order,

        title: "",        });

        subtitle: "",        setEditingImage(null);

        image_url: "",      } else {

        call_to_action_text: "",        await adminAPI.createHeroImage({

        call_to_action_url: "",          title: formData.title,

        display_order: 1          description: formData.subtitle,

      });          imageUrl: formData.image_url,

      setIsCreating(false);          callToAction: {

      refetch();            text: formData.call_to_action_text,

    } catch (error) {            url: formData.call_to_action_url

      toast({          },

        title: "Error",          displayOrder: formData.display_order,

        description: error instanceof Error ? error.message : "Failed to save hero image",        });

        variant: "destructive",      }

      });

    }      toast({

  };        title: "Success",

        description: `Hero image ${editingImage ? 'updated' : 'created'} successfully`,

  const deleteImage = async (id: string) => {      });

    if (!confirm("Are you sure you want to delete this hero image?")) return;

      setFormData({

    try {        title: "",

      await adminAPI.deleteHeroImage(id);        subtitle: "",

      toast({        image_url: "",

        title: "Success",        call_to_action_text: "",

        description: "Hero image deleted successfully",        call_to_action_url: "",

      });        display_order: 1

      refetch();      });

    } catch (error) {      setIsCreating(false);

      toast({      refetch();

        title: "Error",    } catch (error) {

        description: "Failed to delete hero image",      toast({

        variant: "destructive",        title: "Error",

      });        description: error instanceof Error ? error.message : "Failed to save hero image",

    }        variant: "destructive",

  };      });

    }

  const startEdit = (image: HeroImage) => {  };

    setEditingImage(image);

    setFormData({  const deleteImage = async (id: string) => {

      title: image.title || '',    if (!confirm("Are you sure you want to delete this hero image?")) return;

      subtitle: image.description || '',

      image_url: image.imageUrl || '',    try {

      call_to_action_text: image.callToAction?.text || '',      await adminAPI.deleteHeroImage(id);

      call_to_action_url: image.callToAction?.url || '',      toast({

      display_order: image.displayOrder || 1        title: "Success",

    });        description: "Hero image deleted successfully",

    setIsCreating(true);      });

  };      refetch();

    } catch (error) {

  const cancelEdit = () => {      toast({

    setEditingImage(null);        title: "Error",

    setIsCreating(false);        description: "Failed to delete hero image",

    setFormData({        variant: "destructive",

      title: "",      });

      subtitle: "",    }

      image_url: "",  };

      call_to_action_text: "",

      call_to_action_url: "",  const startEdit = (image: HeroImage) => {

      display_order: 1    setEditingImage(image);

    });    setFormData({

  };      title: image.title || '',

      subtitle: image.description || '',

  return (      image_url: image.imageUrl || '',

    <AdminLayout>      call_to_action_text: image.callToAction?.text || '',

      <div className="space-y-6">      call_to_action_url: image.callToAction?.url || '',

        <div className="flex items-center justify-between">      display_order: image.displayOrder || 1

          <div>    });

            <h1 className="text-3xl font-bold text-gray-900">Hero Images</h1>    setIsCreating(true);

            <p className="text-gray-500">Manage homepage carousel images and content</p>  };

          </div>

          <Button   const cancelEdit = () => {

            onClick={() => setIsCreating(true)}    setEditingImage(null);

            className="bg-napps-blue hover:bg-napps-blue/90"    setIsCreating(false);

          >    setFormData({

            <Plus className="w-4 h-4 mr-2" />      title: "",

            Add Hero Image      subtitle: "",

          </Button>      image_url: "",

        </div>      call_to_action_text: "",

      call_to_action_url: "",

        {/* Create/Edit Form */}      display_order: 1

        {isCreating && (    });

          <Card>  };

            <CardHeader>

              <CardTitle>{editingImage ? 'Edit' : 'Add New'} Hero Image</CardTitle>  return (

            </CardHeader>    <AdminLayout>

            <CardContent>      <div className="space-y-6">

              <form onSubmit={handleSubmit} className="space-y-6">        <div className="flex items-center justify-between">

                <div className="grid grid-cols-2 gap-6">          <div>

                  <div>            <h1 className="text-3xl font-bold text-gray-900">Hero Images</h1>

                    <Label htmlFor="title">Title *</Label>            <p className="text-gray-500">Manage homepage carousel images and content</p>

                    <Input          </div>

                      id="title"          <Button 

                      value={formData.title}            onClick={() => setIsCreating(true)}

                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}            className="bg-napps-blue hover:bg-napps-blue/90"

                      placeholder="Hero image title"          >

                      required            <Plus className="w-4 h-4 mr-2" />

                    />            Add Hero Image

                  </div>          </Button>

                  <div>        </div>

                    <Label htmlFor="display_order">Display Order</Label>

                    <Input        {/* Create Form */}

                      id="display_order"        {isCreating && (

                      type="number"          <Card>

                      min="1"            <CardHeader>

                      value={formData.display_order}              <CardTitle>Add New Hero Image</CardTitle>

                      onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}            </CardHeader>

                    />            <CardContent>

                  </div>              <form onSubmit={handleSubmit} className="space-y-6">

                </div>                <div className="grid grid-cols-2 gap-6">

                  <div>

                <div>                    <Label htmlFor="title">Title *</Label>

                  <Label htmlFor="subtitle">Subtitle</Label>                    <Input

                  <Textarea                      id="title"

                    id="subtitle"                      value={formData.title}

                    value={formData.subtitle}                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}

                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}                      placeholder="Hero image title"

                    placeholder="Hero image subtitle or description"                      required

                    rows={2}                    />

                  />                  </div>

                </div>                  <div>

                    <Label htmlFor="display_order">Display Order</Label>

                <div>                    <Input

                  <Label>Hero Image *</Label>                      id="display_order"

                  <div className="space-y-4">                      type="number"

                    <div className="flex items-center space-x-2">                      min="1"

                      <Input                      value={formData.display_order}

                        value={formData.image_url}                      onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}

                        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}                    />

                        placeholder="Image URL or upload file below"                  </div>

                        required                </div>

                      />

                      <Button                <div>

                        type="button"                  <Label htmlFor="subtitle">Subtitle</Label>

                        variant="outline"                  <Textarea

                        size="sm"                    id="subtitle"

                        onClick={() => fileInputRef.current?.click()}                    value={formData.subtitle}

                        disabled={uploading}                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}

                      >                    placeholder="Hero image subtitle or description"

                        <Upload className="w-4 h-4 mr-2" />                    rows={2}

                        {uploading ? 'Uploading...' : 'Upload'}                  />

                      </Button>                </div>

                    </div>

                    <input                <div>

                      ref={fileInputRef}                  <Label>Hero Image *</Label>

                      type="file"                  <div className="space-y-4">

                      accept="image/*"                    <div className="flex items-center space-x-2">

                      className="hidden"                      <Input

                      onChange={(e) => {                        value={formData.image_url}

                        const file = e.target.files?.[0];                        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}

                        if (file) handleFileUpload(file);                        placeholder="Image URL or upload file below"

                      }}                        required

                    />                      />

                    {formData.image_url && (                      <Button

                      <div className="border rounded-lg p-2 bg-gray-50">                        type="button"

                        <img                         variant="outline"

                          src={formData.image_url}                         size="sm"

                          alt="Preview"                         onClick={() => fileInputRef.current?.click()}

                          className="w-full h-32 object-cover rounded"                        disabled={uploading}

                        />                      >

                      </div>                        <Upload className="w-4 h-4 mr-2" />

                    )}                        {uploading ? 'Uploading...' : 'Upload'}

                  </div>                      </Button>

                </div>                    </div>

                    <input

                <div className="grid grid-cols-2 gap-6">                      ref={fileInputRef}

                  <div>                      type="file"

                    <Label htmlFor="call_to_action_text">CTA Button Text</Label>                      accept="image/*"

                    <Input                      className="hidden"

                      id="call_to_action_text"                      onChange={(e) => {

                      value={formData.call_to_action_text}                        const file = e.target.files?.[0];

                      onChange={(e) => setFormData(prev => ({ ...prev, call_to_action_text: e.target.value }))}                        if (file) handleFileUpload(file);

                      placeholder="Learn More"                      }}

                    />                    />

                  </div>                    {formData.image_url && (

                  <div>                      <div className="border rounded-lg p-2 bg-gray-50">

                    <Label htmlFor="call_to_action_url">CTA Button URL</Label>                        <img 

                    <Input                          src={formData.image_url} 

                      id="call_to_action_url"                          alt="Preview" 

                      value={formData.call_to_action_url}                          className="w-full h-32 object-cover rounded"

                      onChange={(e) => setFormData(prev => ({ ...prev, call_to_action_url: e.target.value }))}                        />

                      placeholder="/about"                      </div>

                    />                    )}

                  </div>                  </div>

                </div>                </div>



                <div className="flex space-x-4">                <div className="grid grid-cols-2 gap-6">

                  <Button type="submit" className="bg-napps-green hover:bg-napps-green/90">                  <div>

                    {editingImage ? 'Update' : 'Create'} Hero Image                    <Label htmlFor="call_to_action_text">CTA Button Text</Label>

                  </Button>                    <Input

                  <Button                       id="call_to_action_text"

                    type="button"                       value={formData.call_to_action_text}

                    variant="outline"                       onChange={(e) => setFormData(prev => ({ ...prev, call_to_action_text: e.target.value }))}

                    onClick={cancelEdit}                      placeholder="Learn More"

                  >                    />

                    Cancel                  </div>

                  </Button>                  <div>

                </div>                    <Label htmlFor="call_to_action_url">CTA Button URL</Label>

              </form>                    <Input

            </CardContent>                      id="call_to_action_url"

          </Card>                      value={formData.call_to_action_url}

        )}                      onChange={(e) => setFormData(prev => ({ ...prev, call_to_action_url: e.target.value }))}

                      placeholder="/about"

        {/* Images Grid */}                    />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">                  </div>

          {images.map((image) => (                </div>

            <Card key={image._id} className="overflow-hidden">

              <div className="aspect-video bg-gray-100">                <div className="flex space-x-4">

                <img                   <Button type="submit" className="bg-napps-green hover:bg-napps-green/90">

                  src={image.imageUrl}                     {editingImage ? 'Update' : 'Create'} Hero Image

                  alt={image.title}                  </Button>

                  className="w-full h-full object-cover"                  <Button 

                />                    type="button" 

              </div>                    variant="outline" 

              <CardContent className="p-4">                    onClick={cancelEdit}

                <div className="flex items-start justify-between">                  >

                  <div className="flex-1">                    Cancel

                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>                  </Button>

                    {image.description && (                </div>

                      <p className="text-sm text-gray-600 mb-2">{image.description}</p>              </form>

                    )}            </CardContent>

                    {image.callToAction?.text && (          </Card>

                      <p className="text-xs text-blue-600 mb-2">CTA: {image.callToAction.text}</p>        )}

                    )}

                    <div className="flex items-center space-x-2 text-xs text-gray-500">        {/* Images Grid */}

                      <span>Order: {image.displayOrder}</span>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                      <span className={`px-2 py-1 rounded ${image.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>          {images.map((image) => (

                        {image.isActive ? 'Active' : 'Inactive'}            <Card key={image._id} className="overflow-hidden">

                      </span>              <div className="aspect-video bg-gray-100">

                    </div>                <img 

                  </div>                  src={image.imageUrl} 

                  <div className="flex items-center space-x-1 ml-2">                  alt={image.title}

                    <Button                  className="w-full h-full object-cover"

                      variant="ghost"                />

                      size="sm"              </div>

                      onClick={() => startEdit(image)}              <CardContent className="p-4">

                      className="p-1"                <div className="flex items-start justify-between">

                    >                  <div className="flex-1">

                      <Edit className="w-4 h-4" />                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>

                    </Button>                    {image.description && (

                    <Button                      <p className="text-sm text-gray-600 mb-2">{image.description}</p>

                      variant="ghost"                    )}

                      size="sm"                    {image.callToAction?.text && (

                      onClick={() => deleteImage(image._id)}                      <p className="text-xs text-blue-600 mb-2">CTA: {image.callToAction.text}</p>

                      className="p-1 text-red-500 hover:text-red-700"                    )}

                    >                    <div className="flex items-center space-x-2 text-xs text-gray-500">

                      <Trash2 className="w-4 h-4" />                      <span>Order: {image.displayOrder}</span>

                    </Button>                      <span className={`px-2 py-1 rounded ${image.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>

                  </div>                        {image.isActive ? 'Active' : 'Inactive'}

                </div>                      </span>

              </CardContent>                    </div>

            </Card>                  </div>

          ))}                  <div className="flex items-center space-x-1 ml-2">

        </div>                    <Button size="sm" variant="ghost">

                      <Edit className="w-4 h-4" />

        {images.length === 0 && (                    </Button>

          <Card className="py-12">                    <Button

            <CardContent className="text-center">                      size="sm"

              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />                      variant="ghost"

              <h3 className="text-lg font-medium text-gray-900 mb-2">No hero images yet</h3>                      onClick={() => deleteImage(image.id)}

              <p className="text-gray-500 mb-4">Start by adding your first hero image for the homepage carousel.</p>                      className="text-red-600 hover:text-red-800"

              <Button                     >

                onClick={() => setIsCreating(true)}                      <Trash2 className="w-4 h-4" />

                className="bg-napps-blue hover:bg-napps-blue/90"                    </Button>

              >                  </div>

                <Plus className="w-4 h-4 mr-2" />                </div>

                Add Your First Hero Image              </CardContent>

              </Button>            </Card>

            </CardContent>          ))}

          </Card>        </div>

        )}

      </div>        {images.length === 0 && !isCreating && (

    </AdminLayout>          <Card>

  );            <CardContent className="p-12 text-center">

};              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">

                <Upload className="w-8 h-8 text-gray-400" />

export default HeroImagesPage;              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hero images yet</h3>
              <p className="text-gray-500 mb-4">Add your first hero image to get started.</p>
              <Button onClick={() => setIsCreating(true)} className="bg-napps-blue hover:bg-napps-blue/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Hero Image
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default HeroImagesPage;