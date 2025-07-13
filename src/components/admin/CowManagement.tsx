import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Cow {
  id: string;
  name: string;
  gender: string | null;
  age: number | null;
  lactation: boolean;
  lactationday: string;
  mother: string | null;
  father: string | null;
  origine: string | null;
  comments: string | null;
}

export const CowManagement = () => {
  const [cows, setCows] = useState<Cow[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCow, setEditingCow] = useState<Cow | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    //lactation: false,
    lactationday: "",
    mother: "",
    father: "",
    origine: "",
    comments: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCows();
  }, []);

  const fetchCows = async () => {
    const { data, error } = await supabase
      .from("cows")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch cows",
        variant: "destructive",
      });
    } else {
      setCows(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cowData = {
      name: formData.name,
      gender: formData.gender || null,
      age: formData.age ? parseInt(formData.age) : null,
    //  lactation: formData.lactation,
      lactationday: formData.lactationday || "",
      mother: formData.mother || null,
      father: formData.father || null,
      origine: formData.origine || null,
      comments: formData.comments || null,
    };

    if (editingCow) {
      const { error } = await supabase
        .from("cows")
        .update(cowData)
        .eq("id", editingCow.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update cow",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Cow updated successfully",
        });
        setEditingCow(null);
        fetchCows();
      }
    } else {
      const { error } = await supabase.from("cows").insert([cowData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add cow",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Cow added successfully",
        });
        setIsAddDialogOpen(false);
        fetchCows();
      }
    }

    setFormData({
      name: "",
      gender: "",
      age: "",
  //    lactation: false,
      lactationday: "",
      mother: "",
      father: "",
      origine: "",
      comments: "",
    });
  };

  const handleEdit = (cow: Cow) => {
    setEditingCow(cow);
    setFormData({
      name: cow.name,
      gender: cow.gender || "",
      age: cow.age?.toString() || "",
    //  lactation: cow.lactation,
      lactationday: cow.lactationday || "",
      mother: cow.mother || "",
      father: cow.father || "",
      origine: cow.origine || "",
      comments: cow.comments || "",
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("cows").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete cow",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Cow deleted successfully",
      });
      fetchCows();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Cow Management</CardTitle>
            <CardDescription>Manage your dairy farm cattle</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Cow
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Cow</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="age">Age (months)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mother">Mother</Label>
                    <Input
                      id="mother"
                      value={formData.mother}
                      onChange={(e) =>
                        setFormData({ ...formData, mother: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lactationday">Lactation</Label>
                    <Input
                      id="lactationday"
                      value={formData.lactationday}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lactationday: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="father">Father</Label>
                    <Input
                      id="father"
                      value={formData.father}
                      onChange={(e) =>
                        setFormData({ ...formData, father: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="origine">Origin</Label>
                  <Input
                    id="origine"
                    value={formData.origine}
                    onChange={(e) =>
                      setFormData({ ...formData, origine: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    value={formData.comments}
                    onChange={(e) =>
                      setFormData({ ...formData, comments: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Cow
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age (months)</TableHead>
              <TableHead>Lactation</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cows.map((cow) => (
              <TableRow key={cow.id}>
                <TableCell className="font-medium">{cow.name}</TableCell>
                <TableCell>{cow.gender || "N/A"}</TableCell>
                <TableCell>{cow.age || "N/A"}</TableCell>
               
                <TableCell>{cow.lactationday || "N/A"}</TableCell>
                <TableCell>{cow.origine || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(cow)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(cow.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {editingCow && (
        <Dialog open={!!editingCow} onOpenChange={() => setEditingCow(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Cow</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-age">Age (months)</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-mother">Lactation</Label>
                <Input
                  id="edit-mother"
                  value={formData.lactationday}
                  onChange={(e) =>
                    setFormData({ ...formData, lactationday: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-mother">Mother</Label>
                  <Input
                    id="edit-mother"
                    value={formData.mother}
                    onChange={(e) =>
                      setFormData({ ...formData, mother: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-father">Father</Label>
                  <Input
                    id="edit-father"
                    value={formData.father}
                    onChange={(e) =>
                      setFormData({ ...formData, father: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-origine">Origin</Label>
                <Input
                  id="edit-origine"
                  value={formData.origine}
                  onChange={(e) =>
                    setFormData({ ...formData, origine: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-comments">Comments</Label>
                <Textarea
                  id="edit-comments"
                  value={formData.comments}
                  onChange={(e) =>
                    setFormData({ ...formData, comments: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Update Cow
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};
