import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FeedRecord {
  id: string;
  cow_id: string | null;
  vaccine: string | null;
  deworming: string | null;
  disease: string | null;
  medical_note: string | null;
  grower_below_6_months: number | null;
  grower_above_6_months: number | null;
  tuver_bhusu: number | null;
  ghau_bhusu: number | null;
  chana_bhusu: number | null;
  juvar_bajari: number | null;
  sheradi_kucha: number | null;
  saileg: number | null;
  makai: number | null;
  bajari_juvar: number | null;
  bajari_sheradi: number | null;
  bajari_makai: number | null;
  vegetable_waste: number | null;
  kapas_khod: number | null;
  makai_khod: number | null;
  readymade_feed: number | null;
  milk_output: number | null;
  record_date: string;
}

interface Cow {
  id: string;
  name: string;
}

export const FeedManagement = () => {
  const [feedRecords, setFeedRecords] = useState<FeedRecord[]>([]);
  const [cows, setCows] = useState<Cow[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FeedRecord | null>(null);
  const [formData, setFormData] = useState({
    cow_id: "",
    vaccine: "",
    deworming: "",
    disease: "",
    medical_note: "",
    grower_below_6_months: "",
    grower_above_6_months: "",
    tuver_bhusu: "",
    ghau_bhusu: "",
    chana_bhusu: "",
    juvar_bajari: "",
    sheradi_kucha: "",
    saileg: "",
    makai: "",
    bajari_juvar: "",
    bajari_sheradi: "",
    bajari_makai: "",
    vegetable_waste: "",
    kapas_khod: "",
    makai_khod: "",
    readymade_feed: "",
    milk_output: "",
    record_date: new Date().toISOString().split('T')[0]
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFeedRecords();
    fetchCows();
  }, []);

  const fetchFeedRecords = async () => {
    const { data, error } = await supabase
      .from('feed_records')
      .select('*')
      .order('record_date', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch feed records",
        variant: "destructive",
      });
    } else {
      setFeedRecords(data || []);
    }
  };

  const fetchCows = async () => {
    const { data, error } = await supabase
      .from('cows')
      .select('id, name')
      .order('name');

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
    
    const recordData = {
      cow_id: formData.cow_id || null,
      vaccine: formData.vaccine || null,
      deworming: formData.deworming || null,
      disease: formData.disease || null,
      medical_note: formData.medical_note || null,
      grower_below_6_months: formData.grower_below_6_months ? parseFloat(formData.grower_below_6_months) : null,
      grower_above_6_months: formData.grower_above_6_months ? parseFloat(formData.grower_above_6_months) : null,
      tuver_bhusu: formData.tuver_bhusu ? parseFloat(formData.tuver_bhusu) : null,
      ghau_bhusu: formData.ghau_bhusu ? parseFloat(formData.ghau_bhusu) : null,
      chana_bhusu: formData.chana_bhusu ? parseFloat(formData.chana_bhusu) : null,
      juvar_bajari: formData.juvar_bajari ? parseFloat(formData.juvar_bajari) : null,
      sheradi_kucha: formData.sheradi_kucha ? parseFloat(formData.sheradi_kucha) : null,
      saileg: formData.saileg ? parseFloat(formData.saileg) : null,
      makai: formData.makai ? parseFloat(formData.makai) : null,
      bajari_juvar: formData.bajari_juvar ? parseFloat(formData.bajari_juvar) : null,
      bajari_sheradi: formData.bajari_sheradi ? parseFloat(formData.bajari_sheradi) : null,
      bajari_makai: formData.bajari_makai ? parseFloat(formData.bajari_makai) : null,
      vegetable_waste: formData.vegetable_waste ? parseFloat(formData.vegetable_waste) : null,
      kapas_khod: formData.kapas_khod ? parseFloat(formData.kapas_khod) : null,
      makai_khod: formData.makai_khod ? parseFloat(formData.makai_khod) : null,
      readymade_feed: formData.readymade_feed ? parseFloat(formData.readymade_feed) : null,
      milk_output: formData.milk_output ? parseFloat(formData.milk_output) : null,
      record_date: formData.record_date,
    };

    if (editingRecord) {
      const { error } = await supabase
        .from('feed_records')
        .update(recordData)
        .eq('id', editingRecord.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update feed record",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Feed record updated successfully",
        });
        setEditingRecord(null);
        fetchFeedRecords();
      }
    } else {
      const { error } = await supabase
        .from('feed_records')
        .insert([recordData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add feed record",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Feed record added successfully",
        });
        setIsAddDialogOpen(false);
        fetchFeedRecords();
      }
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      cow_id: "",
      vaccine: "",
      deworming: "",
      disease: "",
      medical_note: "",
      grower_below_6_months: "",
      grower_above_6_months: "",
      tuver_bhusu: "",
      ghau_bhusu: "",
      chana_bhusu: "",
      juvar_bajari: "",
      sheradi_kucha: "",
      saileg: "",
      makai: "",
      bajari_juvar: "",
      bajari_sheradi: "",
      bajari_makai: "",
      vegetable_waste: "",
      kapas_khod: "",
      makai_khod: "",
      readymade_feed: "",
      milk_output: "",
      record_date: new Date().toISOString().split('T')[0]
    });
  };

  const handleEdit = (record: FeedRecord) => {
    setEditingRecord(record);
    setFormData({
      cow_id: record.cow_id || "",
      vaccine: record.vaccine || "",
      deworming: record.deworming || "",
      disease: record.disease || "",
      medical_note: record.medical_note || "",
      grower_below_6_months: record.grower_below_6_months?.toString() || "",
      grower_above_6_months: record.grower_above_6_months?.toString() || "",
      tuver_bhusu: record.tuver_bhusu?.toString() || "",
      ghau_bhusu: record.ghau_bhusu?.toString() || "",
      chana_bhusu: record.chana_bhusu?.toString() || "",
      juvar_bajari: record.juvar_bajari?.toString() || "",
      sheradi_kucha: record.sheradi_kucha?.toString() || "",
      saileg: record.saileg?.toString() || "",
      makai: record.makai?.toString() || "",
      bajari_juvar: record.bajari_juvar?.toString() || "",
      bajari_sheradi: record.bajari_sheradi?.toString() || "",
      bajari_makai: record.bajari_makai?.toString() || "",
      vegetable_waste: record.vegetable_waste?.toString() || "",
      kapas_khod: record.kapas_khod?.toString() || "",
      makai_khod: record.makai_khod?.toString() || "",
      readymade_feed: record.readymade_feed?.toString() || "",
      milk_output: record.milk_output?.toString() || "",
      record_date: record.record_date
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('feed_records')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete feed record",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Feed record deleted successfully",
      });
      fetchFeedRecords();
    }
  };

  const getCowName = (cowId: string | null) => {
    if (!cowId) return 'N/A';
    const cow = cows.find(c => c.id === cowId);
    return cow ? cow.name : 'Unknown';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Feed Management</CardTitle>
            <CardDescription>Manage feed records and health data for your cattle</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Feed Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Add New Feed Record</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cow_id">Cow</Label>
                      <Select value={formData.cow_id} onValueChange={(value) => setFormData({ ...formData, cow_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cow" />
                        </SelectTrigger>
                        <SelectContent>
                          {cows.map((cow) => (
                            <SelectItem key={cow.id} value={cow.id}>
                              {cow.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="record_date">Record Date</Label>
                      <Input
                        id="record_date"
                        type="date"
                        value={formData.record_date}
                        onChange={(e) => setFormData({ ...formData, record_date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vaccine">Vaccine</Label>
                      <Input
                        id="vaccine"
                        value={formData.vaccine}
                        onChange={(e) => setFormData({ ...formData, vaccine: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deworming">Deworming</Label>
                      <Input
                        id="deworming"
                        value={formData.deworming}
                        onChange={(e) => setFormData({ ...formData, deworming: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="disease">Disease</Label>
                      <Input
                        id="disease"
                        value={formData.disease}
                        onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="milk_output">Milk Output (L)</Label>
                      <Input
                        id="milk_output"
                        type="number"
                        step="0.1"
                        value={formData.milk_output}
                        onChange={(e) => setFormData({ ...formData, milk_output: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="medical_note">Medical Note</Label>
                    <Textarea
                      id="medical_note"
                      value={formData.medical_note}
                      onChange={(e) => setFormData({ ...formData, medical_note: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="grower_below_6_months">Grower (Below 6 months)</Label>
                      <Input
                        id="grower_below_6_months"
                        type="number"
                        step="0.1"
                        value={formData.grower_below_6_months}
                        onChange={(e) => setFormData({ ...formData, grower_below_6_months: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="grower_above_6_months">Grower (Above 6 months)</Label>
                      <Input
                        id="grower_above_6_months"
                        type="number"
                        step="0.1"
                        value={formData.grower_above_6_months}
                        onChange={(e) => setFormData({ ...formData, grower_above_6_months: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tuver_bhusu">Tuver Bhusu</Label>
                      <Input
                        id="tuver_bhusu"
                        type="number"
                        step="0.1"
                        value={formData.tuver_bhusu}
                        onChange={(e) => setFormData({ ...formData, tuver_bhusu: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="ghau_bhusu">Ghau Bhusu</Label>
                      <Input
                        id="ghau_bhusu"
                        type="number"
                        step="0.1"
                        value={formData.ghau_bhusu}
                        onChange={(e) => setFormData({ ...formData, ghau_bhusu: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="chana_bhusu">Chana Bhusu</Label>
                      <Input
                        id="chana_bhusu"
                        type="number"
                        step="0.1"
                        value={formData.chana_bhusu}
                        onChange={(e) => setFormData({ ...formData, chana_bhusu: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="juvar_bajari">Juvar - Bajari</Label>
                      <Input
                        id="juvar_bajari"
                        type="number"
                        step="0.1"
                        value={formData.juvar_bajari}
                        onChange={(e) => setFormData({ ...formData, juvar_bajari: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="sheradi_kucha">Sheradi Kucha</Label>
                      <Input
                        id="sheradi_kucha"
                        type="number"
                        step="0.1"
                        value={formData.sheradi_kucha}
                        onChange={(e) => setFormData({ ...formData, sheradi_kucha: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="saileg">Saileg</Label>
                      <Input
                        id="saileg"
                        type="number"
                        step="0.1"
                        value={formData.saileg}
                        onChange={(e) => setFormData({ ...formData, saileg: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="makai">Makai</Label>
                      <Input
                        id="makai"
                        type="number"
                        step="0.1"
                        value={formData.makai}
                        onChange={(e) => setFormData({ ...formData, makai: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bajari_juvar">Bajari - Juvar</Label>
                      <Input
                        id="bajari_juvar"
                        type="number"
                        step="0.1"
                        value={formData.bajari_juvar}
                        onChange={(e) => setFormData({ ...formData, bajari_juvar: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bajari_sheradi">Bajari - Sheradi</Label>
                      <Input
                        id="bajari_sheradi"
                        type="number"
                        step="0.1"
                        value={formData.bajari_sheradi}
                        onChange={(e) => setFormData({ ...formData, bajari_sheradi: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bajari_makai">Bajari - Makai</Label>
                      <Input
                        id="bajari_makai"
                        type="number"
                        step="0.1"
                        value={formData.bajari_makai}
                        onChange={(e) => setFormData({ ...formData, bajari_makai: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="vegetable_waste">Vegetable Waste</Label>
                      <Input
                        id="vegetable_waste"
                        type="number"
                        step="0.1"
                        value={formData.vegetable_waste}
                        onChange={(e) => setFormData({ ...formData, vegetable_waste: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="kapas_khod">Kapas Khod</Label>
                      <Input
                        id="kapas_khod"
                        type="number"
                        step="0.1"
                        value={formData.kapas_khod}
                        onChange={(e) => setFormData({ ...formData, kapas_khod: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="makai_khod">Makai Khod</Label>
                      <Input
                        id="makai_khod"
                        type="number"
                        step="0.1"
                        value={formData.makai_khod}
                        onChange={(e) => setFormData({ ...formData, makai_khod: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="readymade_feed">Readymade Feed</Label>
                    <Input
                      id="readymade_feed"
                      type="number"
                      step="0.1"
                      value={formData.readymade_feed}
                      onChange={(e) => setFormData({ ...formData, readymade_feed: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full">Add Feed Record</Button>
                </form>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cow</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Vaccine</TableHead>
                <TableHead>Milk Output</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{getCowName(record.cow_id)}</TableCell>
                  <TableCell>{new Date(record.record_date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.vaccine || 'N/A'}</TableCell>
                  <TableCell>{record.milk_output ? `${record.milk_output}L` : 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(record)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(record.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>

      {editingRecord && (
        <Dialog open={!!editingRecord} onOpenChange={() => setEditingRecord(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Edit Feed Record</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-cow_id">Cow</Label>
                    <Select value={formData.cow_id} onValueChange={(value) => setFormData({ ...formData, cow_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cow" />
                      </SelectTrigger>
                      <SelectContent>
                        {cows.map((cow) => (
                          <SelectItem key={cow.id} value={cow.id}>
                            {cow.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-record_date">Record Date</Label>
                    <Input
                      id="edit-record_date"
                      type="date"
                      value={formData.record_date}
                      onChange={(e) => setFormData({ ...formData, record_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-vaccine">Vaccine</Label>
                    <Input
                      id="edit-vaccine"
                      value={formData.vaccine}
                      onChange={(e) => setFormData({ ...formData, vaccine: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-deworming">Deworming</Label>
                    <Input
                      id="edit-deworming"
                      value={formData.deworming}
                      onChange={(e) => setFormData({ ...formData, deworming: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-disease">Disease</Label>
                    <Input
                      id="edit-disease"
                      value={formData.disease}
                      onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-milk_output">Milk Output (L)</Label>
                    <Input
                      id="edit-milk_output"
                      type="number"
                      step="0.1"
                      value={formData.milk_output}
                      onChange={(e) => setFormData({ ...formData, milk_output: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-medical_note">Medical Note</Label>
                  <Textarea
                    id="edit-medical_note"
                    value={formData.medical_note}
                    onChange={(e) => setFormData({ ...formData, medical_note: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-grower_below_6_months">Grower (Below 6 months)</Label>
                    <Input
                      id="edit-grower_below_6_months"
                      type="number"
                      step="0.1"
                      value={formData.grower_below_6_months}
                      onChange={(e) => setFormData({ ...formData, grower_below_6_months: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-grower_above_6_months">Grower (Above 6 months)</Label>
                    <Input
                      id="edit-grower_above_6_months"
                      type="number"
                      step="0.1"
                      value={formData.grower_above_6_months}
                      onChange={(e) => setFormData({ ...formData, grower_above_6_months: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-tuver_bhusu">Tuver Bhusu</Label>
                    <Input
                      id="edit-tuver_bhusu"
                      type="number"
                      step="0.1"
                      value={formData.tuver_bhusu}
                      onChange={(e) => setFormData({ ...formData, tuver_bhusu: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-ghau_bhusu">Ghau Bhusu</Label>
                    <Input
                      id="edit-ghau_bhusu"
                      type="number"
                      step="0.1"
                      value={formData.ghau_bhusu}
                      onChange={(e) => setFormData({ ...formData, ghau_bhusu: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-chana_bhusu">Chana Bhusu</Label>
                    <Input
                      id="edit-chana_bhusu"
                      type="number"
                      step="0.1"
                      value={formData.chana_bhusu}
                      onChange={(e) => setFormData({ ...formData, chana_bhusu: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-juvar_bajari">Juvar - Bajari</Label>
                    <Input
                      id="edit-juvar_bajari"
                      type="number"
                      step="0.1"
                      value={formData.juvar_bajari}
                      onChange={(e) => setFormData({ ...formData, juvar_bajari: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-sheradi_kucha">Sheradi Kucha</Label>
                    <Input
                      id="edit-sheradi_kucha"
                      type="number"
                      step="0.1"
                      value={formData.sheradi_kucha}
                      onChange={(e) => setFormData({ ...formData, sheradi_kucha: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-saileg">Saileg</Label>
                    <Input
                      id="edit-saileg"
                      type="number"
                      step="0.1"
                      value={formData.saileg}
                      onChange={(e) => setFormData({ ...formData, saileg: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-makai">Makai</Label>
                    <Input
                      id="edit-makai"
                      type="number"
                      step="0.1"
                      value={formData.makai}
                      onChange={(e) => setFormData({ ...formData, makai: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-bajari_juvar">Bajari - Juvar</Label>
                    <Input
                      id="edit-bajari_juvar"
                      type="number"
                      step="0.1"
                      value={formData.bajari_juvar}
                      onChange={(e) => setFormData({ ...formData, bajari_juvar: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-bajari_sheradi">Bajari - Sheradi</Label>
                    <Input
                      id="edit-bajari_sheradi"
                      type="number"
                      step="0.1"
                      value={formData.bajari_sheradi}
                      onChange={(e) => setFormData({ ...formData, bajari_sheradi: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-bajari_makai">Bajari - Makai</Label>
                    <Input
                      id="edit-bajari_makai"
                      type="number"
                      step="0.1"
                      value={formData.bajari_makai}
                      onChange={(e) => setFormData({ ...formData, bajari_makai: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-vegetable_waste">Vegetable Waste</Label>
                    <Input
                      id="edit-vegetable_waste"
                      type="number"
                      step="0.1"
                      value={formData.vegetable_waste}
                      onChange={(e) => setFormData({ ...formData, vegetable_waste: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-kapas_khod">Kapas Khod</Label>
                    <Input
                      id="edit-kapas_khod"
                      type="number"
                      step="0.1"
                      value={formData.kapas_khod}
                      onChange={(e) => setFormData({ ...formData, kapas_khod: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-makai_khod">Makai Khod</Label>
                    <Input
                      id="edit-makai_khod"
                      type="number"
                      step="0.1"
                      value={formData.makai_khod}
                      onChange={(e) => setFormData({ ...formData, makai_khod: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-readymade_feed">Readymade Feed</Label>
                  <Input
                    id="edit-readymade_feed"
                    type="number"
                    step="0.1"
                    value={formData.readymade_feed}
                    onChange={(e) => setFormData({ ...formData, readymade_feed: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full">Update Feed Record</Button>
              </form>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};
