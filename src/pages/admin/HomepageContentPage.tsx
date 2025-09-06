import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHomepageContent, useFileUpload } from "@/hooks/useCMS";
import { useState, useRef } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText,
  Upload, 
  Image,
  Search,
  Save,
  X,
  Eye,
  Layout,
  Crown,
  Users,
  Calendar,
  Camera,
  Settings
} from "lucide-react";
import { type HomepageContent } from "@/services/cms-api";

const HomepageContentPage = () => {
  const { content, loading, createContent, updateContent, deleteContent, refetch } = useHomepageContent();
  const { uploadImage, uploading } = useFileUpload();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingContent, setEditingContent] = useState<HomepageContent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSection, setFilterSection] = useState<string>("all");
  const [filterActive, setFilterActive] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    section: "hero" as HomepageContent['section'],
    title: "",
    subtitle: "",
    content: "",
    imageUrl: "",
    buttonText: "",
    buttonLink: "",
    displayOrder: 1,
    isActive: true,
    metadata: {} as Record<string, unknown>,
  });

  const resetForm = () => {
    setFormData({
      section: "hero",
      title: "",
      subtitle: "",
      content: "",
      imageUrl: "",
      buttonText: "",
      buttonLink: "",
      displayOrder: 1,
      isActive: true,
      metadata: {},
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      return;
    }

    try {
      if (editingContent) {
        await updateContent(editingContent._id!, formData);
        setEditingContent(null);
      } else {
        await createContent(formData);
      }
      
      resetForm();
      setIsCreating(false);
      refetch();
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    
    try {
      await deleteContent(id);
      refetch();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleEdit = (contentItem: HomepageContent) => {
    setEditingContent(contentItem);
    setFormData({
      section: contentItem.section,
      title: contentItem.title,
      subtitle: contentItem.subtitle || "",
      content: contentItem.content,
      imageUrl: contentItem.imageUrl || "",
      buttonText: contentItem.buttonText || "",
      buttonLink: contentItem.buttonLink || "",
      displayOrder: contentItem.displayOrder || 1,
      isActive: contentItem.isActive ?? true,
      metadata: contentItem.metadata || {},
    });
    setIsCreating(true);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadImage(file, 'homepage-image');
      setFormData(prev => ({ ...prev, imageUrl: result.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = filterSection === "all" || item.section === filterSection;
    const matchesActive = filterActive === "all" || 
                         (filterActive === "active" && item.isActive) ||
                         (filterActive === "inactive" && !item.isActive);
    
    return matchesSearch && matchesSection && matchesActive;
  });

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'hero': return <Layout className="w-4 h-4" />;
      case 'about': return <FileText className="w-4 h-4" />;
      case 'elder-omaku': return <Crown className="w-4 h-4" />;
      case 'team': return <Users className="w-4 h-4" />;
      case 'events': return <Calendar className="w-4 h-4" />;
      case 'gallery': return <Camera className="w-4 h-4" />;
      case 'footer': return <Settings className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSectionBadgeColor = (section: string) => {
    switch (section) {
      case 'hero': return 'bg-blue-100 text-blue-800';
      case 'about': return 'bg-green-100 text-green-800';
      case 'elder-omaku': return 'bg-purple-100 text-purple-800';
      case 'team': return 'bg-orange-100 text-orange-800';
      case 'events': return 'bg-red-100 text-red-800';
      case 'gallery': return 'bg-pink-100 text-pink-800';
      case 'footer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sectionStats = {
    hero: content.filter(c => c.section === 'hero').length,
    about: content.filter(c => c.section === 'about').length,
    'elder-omaku': content.filter(c => c.section === 'elder-omaku').length,
    team: content.filter(c => c.section === 'team').length,
    events: content.filter(c => c.section === 'events').length,
    gallery: content.filter(c => c.section === 'gallery').length,
    footer: content.filter(c => c.section === 'footer').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Homepage Content Management</h1>
            <p className="text-gray-500">Manage Elder Omaku photos, homepage sections, and content blocks</p>
          </div>
          <Button 
            onClick={() => {
              setIsCreating(true);
              setEditingContent(null);
              resetForm();
            }}
            className="bg-napps-blue hover:bg-napps-blue/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Content Section
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Layout className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Hero</p>
                  <p className="text-2xl font-bold">{sectionStats.hero}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">About</p>
                  <p className="text-2xl font-bold">{sectionStats.about}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Elder</p>
                  <p className="text-2xl font-bold">{sectionStats['elder-omaku']}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Team</p>
                  <p className="text-2xl font-bold">{sectionStats.team}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-500">Events</p>
                  <p className="text-2xl font-bold">{sectionStats.events}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-500">Gallery</p>
                  <p className="text-2xl font-bold">{sectionStats.gallery}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Footer</p>
                  <p className="text-2xl font-bold">{sectionStats.footer}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{editingContent ? 'Edit Homepage Content' : 'Add New Homepage Content'}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingContent(null);
                    resetForm();
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList>
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="section">Section *</Label>
                        <Select 
                          value={formData.section} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, section: value as HomepageContent['section'] }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hero">Hero Section</SelectItem>
                            <SelectItem value="about">About Section</SelectItem>
                            <SelectItem value="elder-omaku">Elder Omaku</SelectItem>
                            <SelectItem value="team">Team Section</SelectItem>
                            <SelectItem value="events">Events Section</SelectItem>
                            <SelectItem value="gallery">Gallery Section</SelectItem>
                            <SelectItem value="footer">Footer Section</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="displayOrder">Display Order</Label>
                        <Input
                          id="displayOrder"
                          type="number"
                          min="1"
                          value={formData.displayOrder}
                          onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 1 }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Section title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={formData.subtitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                        placeholder="Optional subtitle"
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Section Image</Label>
                      <div className="flex items-center space-x-4">
                        <Input
                          id="image"
                          value={formData.imageUrl}
                          onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                          placeholder="Image URL or upload new image"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                        >
                          {uploading ? <Upload className="w-4 h-4 animate-spin mr-2" /> : <Image className="w-4 h-4 mr-2" />}
                          Upload
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      {formData.imageUrl && (
                        <div className="mt-2">
                          <img 
                            src={formData.imageUrl} 
                            alt="Preview" 
                            className="w-40 h-24 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Section content..."
                        rows={8}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="buttonText">Button Text</Label>
                        <Input
                          id="buttonText"
                          value={formData.buttonText}
                          onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                          placeholder="Learn More"
                        />
                      </div>
                      <div>
                        <Label htmlFor="buttonLink">Button Link</Label>
                        <Input
                          id="buttonLink"
                          value={formData.buttonLink}
                          onChange={(e) => setFormData(prev => ({ ...prev, buttonLink: e.target.value }))}
                          placeholder="/about"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: !!checked }))}
                      />
                      <Label htmlFor="isActive">Active Content Section</Label>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-napps-green hover:bg-napps-green/90">
                    <Save className="w-4 h-4 mr-2" />
                    {editingContent ? 'Update Content' : 'Add Content'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsCreating(false);
                      setEditingContent(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterSection} onValueChange={setFilterSection}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="hero">Hero</SelectItem>
                  <SelectItem value="about">About</SelectItem>
                  <SelectItem value="elder-omaku">Elder Omaku</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="gallery">Gallery</SelectItem>
                  <SelectItem value="footer">Footer</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterActive} onValueChange={setFilterActive}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        {loading ? (
          <div className="text-center py-8">Loading homepage content...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getSectionIcon(item.section)}
                      <Badge className={`text-xs ${getSectionBadgeColor(item.section)}`}>
                        {item.section.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!item.isActive && <Eye className="w-4 h-4 text-gray-400" />}
                    </div>
                  </div>

                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-32 object-cover rounded mb-4"
                    />
                  )}
                  
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                  
                  {item.subtitle && (
                    <p className="text-sm text-napps-blue font-medium mb-2">{item.subtitle}</p>
                  )}
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{item.content}</p>
                  
                  {item.buttonText && (
                    <div className="text-xs text-gray-500 mb-4">
                      Button: "{item.buttonText}" → {item.buttonLink}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Order: {item.displayOrder}</span>
                      {!item.isActive && (
                        <Badge variant="secondary" className="text-xs">Inactive</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item._id!)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredContent.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || filterSection !== "all" || filterActive !== "all" 
                  ? "No matching content found"
                  : "No homepage content yet"
                }
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterSection !== "all" || filterActive !== "all"
                  ? "Try adjusting your search criteria or filters."
                  : "Add your first homepage content section to get started."
                }
              </p>
              {!searchTerm && filterSection === "all" && filterActive === "all" && (
                <Button 
                  onClick={() => {
                    setIsCreating(true);
                    setEditingContent(null);
                    resetForm();
                  }} 
                  className="bg-napps-blue hover:bg-napps-blue/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Content Section
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default HomepageContentPage;