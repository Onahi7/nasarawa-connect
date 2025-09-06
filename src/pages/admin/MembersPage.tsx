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
import { useTeamMembers, useFileUpload } from "@/hooks/useCMS";
import { useState, useRef } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Upload, 
  Image,
  Search,
  Filter,
  Save,
  X,
  Star,
  Eye,
  Users,
  Award
} from "lucide-react";
import { type TeamMember } from "@/services/cms-api";

const MembersPage = () => {
  const { members, loading, createMember, updateMember, deleteMember, refetch } = useTeamMembers();
  const { uploadImage, uploading } = useFileUpload();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterActive, setFilterActive] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "leadership" as TeamMember['category'],
    bio: "",
    email: "",
    phone: "",
    imageUrl: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
    },
    displayOrder: 1,
    isActive: true,
    isFeatured: false,
    metadata: {} as Record<string, unknown>,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      category: "leadership",
      bio: "",
      email: "",
      phone: "",
      imageUrl: "",
      socialLinks: {
        linkedin: "",
        twitter: "",
        facebook: "",
      },
      displayOrder: 1,
      isActive: true,
      isFeatured: false,
      metadata: {},
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.title) {
      return;
    }

    try {
      if (editingMember) {
        await updateMember(editingMember._id!, formData);
        setEditingMember(null);
      } else {
        await createMember(formData);
      }
      
      resetForm();
      setIsCreating(false);
      refetch();
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    
    try {
      await deleteMember(id);
      refetch();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      title: member.title,
      category: member.category,
      bio: member.bio || "",
      email: member.email || "",
      phone: member.phone || "",
      imageUrl: member.imageUrl || "",
      socialLinks: member.socialLinks || { linkedin: "", twitter: "", facebook: "" },
      displayOrder: member.displayOrder || 1,
      isActive: member.isActive ?? true,
      isFeatured: member.isFeatured ?? false,
      metadata: member.metadata || {},
    });
    setIsCreating(true);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadImage(file, 'team-photo');
      setFormData(prev => ({ ...prev, imageUrl: result.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || member.category === filterCategory;
    const matchesActive = filterActive === "all" || 
                         (filterActive === "active" && member.isActive) ||
                         (filterActive === "inactive" && !member.isActive);
    
    return matchesSearch && matchesCategory && matchesActive;
  });

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'executive': return 'bg-purple-100 text-purple-800';
      case 'board': return 'bg-blue-100 text-blue-800';
      case 'leadership': return 'bg-green-100 text-green-800';
      case 'staff': return 'bg-orange-100 text-orange-800';
      case 'advisory': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categoryStats = {
    executive: members.filter(m => m.category === 'executive').length,
    board: members.filter(m => m.category === 'board').length,
    leadership: members.filter(m => m.category === 'leadership').length,
    staff: members.filter(m => m.category === 'staff').length,
    advisory: members.filter(m => m.category === 'advisory').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Members Management</h1>
            <p className="text-gray-500">Manage leadership profiles, Elder Omaku photos, and team members</p>
          </div>
          <Button 
            onClick={() => {
              setIsCreating(true);
              setEditingMember(null);
              resetForm();
            }}
            className="bg-napps-blue hover:bg-napps-blue/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Executive</p>
                  <p className="text-2xl font-bold">{categoryStats.executive}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Board</p>
                  <p className="text-2xl font-bold">{categoryStats.board}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Leadership</p>
                  <p className="text-2xl font-bold">{categoryStats.leadership}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Staff</p>
                  <p className="text-2xl font-bold">{categoryStats.staff}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Advisory</p>
                  <p className="text-2xl font-bold">{categoryStats.advisory}</p>
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
                <span>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingMember(null);
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
                    <TabsTrigger value="contact">Contact & Social</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Dr. John Doe"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Title/Position *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Executive Director"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as TeamMember['category'] }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="executive">Executive</SelectItem>
                            <SelectItem value="board">Board</SelectItem>
                            <SelectItem value="leadership">Leadership</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="advisory">Advisory</SelectItem>
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
                      <Label htmlFor="bio">Biography</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Brief biography and background..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Profile Image</Label>
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
                            className="w-20 h-20 object-cover rounded-full"
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="contact" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+234 800 123 4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Social Media Links</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={formData.socialLinks.linkedin}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                            }))}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div>
                          <Label htmlFor="twitter">Twitter</Label>
                          <Input
                            id="twitter"
                            value={formData.socialLinks.twitter}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                            }))}
                            placeholder="https://twitter.com/username"
                          />
                        </div>
                        <div>
                          <Label htmlFor="facebook">Facebook</Label>
                          <Input
                            id="facebook"
                            value={formData.socialLinks.facebook}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                            }))}
                            placeholder="https://facebook.com/username"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isActive"
                          checked={formData.isActive}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: !!checked }))}
                        />
                        <Label htmlFor="isActive">Active Member</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isFeatured"
                          checked={formData.isFeatured}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: !!checked }))}
                        />
                        <Label htmlFor="isFeatured">Featured Member</Label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-napps-green hover:bg-napps-green/90">
                    <Save className="w-4 h-4 mr-2" />
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsCreating(false);
                      setEditingMember(null);
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
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="board">Board</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="advisory">Advisory</SelectItem>
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

        {/* Members Grid */}
        {loading ? (
          <div className="text-center py-8">Loading team members...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                      {member.imageUrl ? (
                        <img 
                          src={member.imageUrl} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 truncate">{member.name}</h3>
                          <p className="text-sm text-napps-blue font-medium">{member.title}</p>
                        </div>
                        <div className="flex space-x-1">
                          {member.isFeatured && <Star className="w-4 h-4 text-yellow-500" />}
                          {!member.isActive && <Eye className="w-4 h-4 text-gray-400" />}
                        </div>
                      </div>
                      
                      <Badge className={`mt-2 text-xs ${getCategoryBadgeColor(member.category)}`}>
                        {member.category}
                      </Badge>
                      
                      {member.bio && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{member.bio}</p>
                      )}
                      
                      {(member.email || member.phone) && (
                        <div className="mt-3 text-xs text-gray-500">
                          {member.email && <div>{member.email}</div>}
                          {member.phone && <div>{member.phone}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Order: {member.displayOrder}</span>
                      {!member.isActive && (
                        <Badge variant="secondary" className="text-xs">Inactive</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(member._id!)}
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

        {filteredMembers.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || filterCategory !== "all" || filterActive !== "all" 
                  ? "No matching team members found"
                  : "No team members yet"
                }
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterCategory !== "all" || filterActive !== "all"
                  ? "Try adjusting your search criteria or filters."
                  : "Add your first team member to get started."
                }
              </p>
              {!searchTerm && filterCategory === "all" && filterActive === "all" && (
                <Button 
                  onClick={() => {
                    setIsCreating(true);
                    setEditingMember(null);
                    resetForm();
                  }} 
                  className="bg-napps-blue hover:bg-napps-blue/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default MembersPage;