import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Edit, Trash2, Search, ArrowUpDown, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";



const formatDate = (dateString?: string | null) => {
  if (!dateString) return "N/A";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "N/A";
  return d.toLocaleDateString("en-GB"); 
};

const toOneDecimal = (v: string | number | null | undefined): number | null => {
  if (v === null || v === undefined || v === "") return null;
  const num = typeof v === "string" ? parseFloat(v) : v;
  if (Number.isNaN(num)) return null;
  return Math.round(num * 10) / 10; 
};

const formatMilkDisplay = (v: number | null | undefined) => {
  if (v === null || v === undefined) return "N/A";
  return `${(Math.round(v * 10) / 10).toFixed(1)}L`;
};
// -------------------------


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
  milk_output_morning: number | null;
  milk_output_evening: number | null;
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
  const [viewingRecord, setViewingRecord] = useState<FeedRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByCow, setFilterByCow] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"cow_name" | "record_date" | "milk_output">("record_date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
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
    milk_output_morning: "",
    milk_output_evening: "",
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

  // Filter and sort feed records
  const filteredAndSortedRecords = useMemo(() => {
    let filtered = feedRecords;

    // Filter by cow name search
    if (searchTerm) {
      filtered = filtered.filter(record => {
        const cowName = getCowName(record.cow_id);
        return cowName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Filter by specific cow
    if (filterByCow !== "all") {
      filtered = filtered.filter(record => record.cow_id === filterByCow);
    }

    // Sort records
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case "cow_name":
          aValue = getCowName(a.cow_id);
          bValue = getCowName(b.cow_id);
          break;
        case "record_date":
          aValue = a.record_date;
          bValue = b.record_date;
          break;
        case "milk_output":
          aValue = (a.milk_output_morning || 0) + (a.milk_output_evening || 0);
          bValue = (b.milk_output_morning || 0) + (b.milk_output_evening || 0);
          break;
        default:
          aValue = a.record_date;
          bValue = b.record_date;
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [feedRecords, searchTerm, filterByCow, sortBy, sortOrder, cows]);

  const handleSort = (column: "cow_name" | "record_date" | "milk_output") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const morning = toOneDecimal(formData.milk_output_morning);
    const evening = toOneDecimal(formData.milk_output_evening);
    
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
      milk_output_morning: morning,
  milk_output_evening: evening,
  milk_output:
    morning !== null || evening !== null
      ? toOneDecimal((morning || 0) + (evening || 0))
      : null,

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
      milk_output_morning: "",
      milk_output_evening: "",
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
     milk_output_morning: record.milk_output_morning != null ? record.milk_output_morning.toFixed(1) : "",
milk_output_evening: record.milk_output_evening != null ? record.milk_output_evening.toFixed(1) : "",

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

 const getTotalMilkOutput = (record: FeedRecord) => {
  const morning = record.milk_output_morning ?? 0;
  const evening = record.milk_output_evening ?? 0;
  const total = Math.round((morning + evening) * 10) / 10;
  return Number.isFinite(total) ? total : 0;
};


  const renderFormFields = (isEdit = false) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={isEdit ? "edit-cow_id" : "cow_id"}>Cow</Label>
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
          <Label htmlFor={isEdit ? "edit-record_date" : "record_date"}>Record Date</Label>
          <Input
            id={isEdit ? "edit-record_date" : "record_date"}
            type="date"
            value={formData.record_date}
            onChange={(e) => setFormData({ ...formData, record_date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={isEdit ? "edit-vaccine" : "vaccine"}>Vaccine</Label>
          <Input
            id={isEdit ? "edit-vaccine" : "vaccine"}
            value={formData.vaccine}
            onChange={(e) => setFormData({ ...formData, vaccine: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-deworming" : "deworming"}>Deworming</Label>
          <Input
            id={isEdit ? "edit-deworming" : "deworming"}
            value={formData.deworming}
            onChange={(e) => setFormData({ ...formData, deworming: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor={isEdit ? "edit-disease" : "disease"}>Disease</Label>
          <Input
            id={isEdit ? "edit-disease" : "disease"}
            value={formData.disease}
            onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-milk_output_morning" : "milk_output_morning"}>Morning Milk Output (L)</Label>
          <Input
            id={isEdit ? "edit-milk_output_morning" : "milk_output_morning"}
            type="number"
            step="0.1"
            value={formData.milk_output_morning}
            onChange={(e) => setFormData({ ...formData, milk_output_morning: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-milk_output_evening" : "milk_output_evening"}>Evening Milk Output (L)</Label>
          <Input
            id={isEdit ? "edit-milk_output_evening" : "milk_output_evening"}
            type="number"
            step="0.1"
            value={formData.milk_output_evening}
            onChange={(e) => setFormData({ ...formData, milk_output_evening: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor={isEdit ? "edit-medical_note" : "medical_note"}>Medical Note</Label>
        <Textarea
          id={isEdit ? "edit-medical_note" : "medical_note"}
          value={formData.medical_note}
          onChange={(e) => setFormData({ ...formData, medical_note: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor={isEdit ? "edit-grower_below_6_months" : "grower_below_6_months"}>Grower (Below 6 months)</Label>
          <Input
            id={isEdit ? "edit-grower_below_6_months" : "grower_below_6_months"}
            type="number"
            step="0.1"
            value={formData.grower_below_6_months}
            onChange={(e) => setFormData({ ...formData, grower_below_6_months: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-grower_above_6_months" : "grower_above_6_months"}>Grower (Above 6 months)</Label>
          <Input
            id={isEdit ? "edit-grower_above_6_months" : "grower_above_6_months"}
            type="number"
            step="0.1"
            value={formData.grower_above_6_months}
            onChange={(e) => setFormData({ ...formData, grower_above_6_months: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-tuver_bhusu" : "tuver_bhusu"}>Tuver Bhusu</Label>
          <Input
            id={isEdit ? "edit-tuver_bhusu" : "tuver_bhusu"}
            type="number"
            step="0.1"
            value={formData.tuver_bhusu}
            onChange={(e) => setFormData({ ...formData, tuver_bhusu: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor={isEdit ? "edit-ghau_bhusu" : "ghau_bhusu"}>Ghau Bhusu</Label>
          <Input
            id={isEdit ? "edit-ghau_bhusu" : "ghau_bhusu"}
            type="number"
            step="0.1"
            value={formData.ghau_bhusu}
            onChange={(e) => setFormData({ ...formData, ghau_bhusu: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-chana_bhusu" : "chana_bhusu"}>Chana Bhusu</Label>
          <Input
            id={isEdit ? "edit-chana_bhusu" : "chana_bhusu"}
            type="number"
            step="0.1"
            value={formData.chana_bhusu}
            onChange={(e) => setFormData({ ...formData, chana_bhusu: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-juvar_bajari" : "juvar_bajari"}>Juvar - Bajari</Label>
          <Input
            id={isEdit ? "edit-juvar_bajari" : "juvar_bajari"}
            type="number"
            step="0.1"
            value={formData.juvar_bajari}
            onChange={(e) => setFormData({ ...formData, juvar_bajari: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor={isEdit ? "edit-sheradi_kucha" : "sheradi_kucha"}>Sheradi Kucha</Label>
          <Input
            id={isEdit ? "edit-sheradi_kucha" : "sheradi_kucha"}
            type="number"
            step="0.1"
            value={formData.sheradi_kucha}
            onChange={(e) => setFormData({ ...formData, sheradi_kucha: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-saileg" : "saileg"}>Saileg</Label>
          <Input
            id={isEdit ? "edit-saileg" : "saileg"}
            type="number"
            step="0.1"
            value={formData.saileg}
            onChange={(e) => setFormData({ ...formData, saileg: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-makai" : "makai"}>Makai</Label>
          <Input
            id={isEdit ? "edit-makai" : "makai"}
            type="number"
            step="0.1"
            value={formData.makai}
            onChange={(e) => setFormData({ ...formData, makai: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor={isEdit ? "edit-bajari_juvar" : "bajari_juvar"}>Bajari - Juvar</Label>
          <Input
            id={isEdit ? "edit-bajari_juvar" : "bajari_juvar"}
            type="number"
            step="0.1"
            value={formData.bajari_juvar}
            onChange={(e) => setFormData({ ...formData, bajari_juvar: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-bajari_sheradi" : "bajari_sheradi"}>Bajari - Sheradi</Label>
          <Input
            id={isEdit ? "edit-bajari_sheradi" : "bajari_sheradi"}
            type="number"
            step="0.1"
            value={formData.bajari_sheradi}
            onChange={(e) => setFormData({ ...formData, bajari_sheradi: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-bajari_makai" : "bajari_makai"}>Bajari - Makai</Label>
          <Input
            id={isEdit ? "edit-bajari_makai" : "bajari_makai"}
            type="number"
            step="0.1"
            value={formData.bajari_makai}
            onChange={(e) => setFormData({ ...formData, bajari_makai: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor={isEdit ? "edit-vegetable_waste" : "vegetable_waste"}>Vegetable Waste</Label>
          <Input
            id={isEdit ? "edit-vegetable_waste" : "vegetable_waste"}
            type="number"
            step="0.1"
            value={formData.vegetable_waste}
            onChange={(e) => setFormData({ ...formData, vegetable_waste: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-kapas_khod" : "kapas_khod"}>Kapas Khod</Label>
          <Input
            id={isEdit ? "edit-kapas_khod" : "kapas_khod"}
            type="number"
            step="0.1"
            value={formData.kapas_khod}
            onChange={(e) => setFormData({ ...formData, kapas_khod: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={isEdit ? "edit-makai_khod" : "makai_khod"}>Makai Khod</Label>
          <Input
            id={isEdit ? "edit-makai_khod" : "makai_khod"}
            type="number"
            step="0.1"
            value={formData.makai_khod}
            onChange={(e) => setFormData({ ...formData, makai_khod: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor={isEdit ? "edit-readymade_feed" : "readymade_feed"}>Readymade Feed</Label>
        <Input
          id={isEdit ? "edit-readymade_feed" : "readymade_feed"}
          type="number"
          step="0.1"
          value={formData.readymade_feed}
          onChange={(e) => setFormData({ ...formData, readymade_feed: e.target.value })}
        />
      </div>
    </>
  );

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
                  {renderFormFields()}
                  <Button type="submit" className="w-full">Add Feed Record</Button>
                </form>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex gap-4 items-center mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by cow name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterByCow} onValueChange={setFilterByCow}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by cow" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cows</SelectItem>
              {cows.map((cow) => (
                <SelectItem key={cow.id} value={cow.id}>
                  {cow.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value: "cow_name" | "record_date" | "milk_output") => setSortBy(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cow_name">Cow Name</SelectItem>
              <SelectItem value="record_date">Record Date</SelectItem>
              <SelectItem value="milk_output">Total Milk Output</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("cow_name")}
                >
                  Cow
                  {sortBy === "cow_name" && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("record_date")}
                >
                  Date
                  {sortBy === "record_date" && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead>deworming</TableHead>
                <TableHead>Morning Milk</TableHead>
                <TableHead>Evening Milk</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("milk_output")}
                >
                  Total Milk
                  {sortBy === "milk_output" && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{getCowName(record.cow_id)}</TableCell>
                  <TableCell>{formatDate(record.record_date)}</TableCell>

                  <TableCell>{record.deworming || 'N/A'}</TableCell>
                 <TableCell>{formatMilkDisplay(record.milk_output_morning)}</TableCell>
<TableCell>{formatMilkDisplay(record.milk_output_evening)}</TableCell>
<TableCell>
  {record.milk_output != null
    ? `${(Math.round((record.milk_output) * 10) / 10).toFixed(1)}L`
    : 
    (record.milk_output_morning == null && record.milk_output_evening == null
      ? "N/A"
      : `${(Math.round(((record.milk_output_morning || 0) + (record.milk_output_evening || 0)) * 10) / 10).toFixed(1)}L`
    )
  }
</TableCell>

                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewingRecord(record)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
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

      {/* View Record Dialog */}
      {viewingRecord && (
        <Dialog open={!!viewingRecord} onOpenChange={() => setViewingRecord(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Feed Record Details - {getCowName(viewingRecord.cow_id)}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Cow</Label>
                    <p className="text-sm text-muted-foreground">{getCowName(viewingRecord.cow_id)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Record Date</Label>
                    <p className="text-sm text-muted-foreground">{new Date(viewingRecord.record_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Total Milk Output</Label>
                    <p className="text-sm text-muted-foreground">{getTotalMilkOutput(viewingRecord)}L</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Morning Milk Output</Label>
                    <p className="text-sm text-muted-foreground">{viewingRecord.milk_output_morning || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Evening Milk Output</Label>
                    <p className="text-sm text-muted-foreground">{viewingRecord.milk_output_evening || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Vaccine</Label>
                    <p className="text-sm text-muted-foreground">{viewingRecord.vaccine || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Deworming</Label>
                    <p className="text-sm text-muted-foreground">{viewingRecord.deworming || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Disease</Label>
                    <p className="text-sm text-muted-foreground">{viewingRecord.disease || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Medical Note</Label>
                    <p className="text-sm text-muted-foreground">{viewingRecord.medical_note || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Feed Details</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label className="text-sm font-medium">Grower (Below 6 months)</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.grower_below_6_months || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Grower (Above 6 months)</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.grower_above_6_months || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Tuver Bhusu</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.tuver_bhusu || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label className="text-sm font-medium">Ghau Bhusu</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.ghau_bhusu || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Chana Bhusu</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.chana_bhusu || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Juvar - Bajari</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.juvar_bajari || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label className="text-sm font-medium">Sheradi Kucha</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.sheradi_kucha || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Saileg</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.saileg || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Makai</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.makai || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label className="text-sm font-medium">Bajari - Juvar</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.bajari_juvar || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Bajari - Sheradi</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.bajari_sheradi || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Bajari - Makai</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.bajari_makai || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label className="text-sm font-medium">Vegetable Waste</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.vegetable_waste || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Kapas Khod</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.kapas_khod || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Makai Khod</Label>
                      <p className="text-sm text-muted-foreground">{viewingRecord.makai_khod || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Label className="text-sm font-medium">Readymade Feed</Label>
                    <p className="text-sm text-muted-foreground">{viewingRecord.readymade_feed || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Record Dialog */}
      {editingRecord && (
        <Dialog open={!!editingRecord} onOpenChange={() => setEditingRecord(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Edit Feed Record</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {renderFormFields(true)}
                <Button type="submit" className="w-full">Update Feed Record</Button>
              </form>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};
