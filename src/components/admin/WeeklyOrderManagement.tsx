import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Save, Plus } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Customer = Tables<"customers">;

interface WeeklyOrder {
  customerId: string;
  customerName: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  item: string;
  month: number;
  year: number;
}

const DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

const ITEMS = ['Milk', 'Curd', 'Butter', 'Ghee', 'Paneer'];

export function WeeklyOrderManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const [weeklyOrder, setWeeklyOrder] = useState<Omit<WeeklyOrder, 'customerName'>>({
    customerId: '',
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
    item: 'Milk',
    month: selectedMonth,
    year: selectedYear,
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("name");

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch customers.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateOrdersForMonth = (order: WeeklyOrder) => {
    const orders = [];
    const daysInMonth = new Date(order.year, order.month, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(order.year, order.month - 1, day);
      
      let quantity = 0;
      switch (date.getDay()) {
        case 1: quantity = order.monday; break;
        case 2: quantity = order.tuesday; break;
        case 3: quantity = order.wednesday; break;
        case 4: quantity = order.thursday; break;
        case 5: quantity = order.friday; break;
        case 6: quantity = order.saturday; break;
        case 0: quantity = order.sunday; break;
      }

      if (quantity > 0) {
        orders.push({
          customer_id: order.customerId,
          customer_name: order.customerName,
          item: order.item,
          quantity,
          order_date: date.toISOString().split('T')[0],
          status: 'pending'
        });
      }
    }
    
    return orders;
  };

  const handleSaveWeeklyOrder = async () => {
    if (!weeklyOrder.customerId) {
      toast({
        title: "Error",
        description: "Please select a customer.",
        variant: "destructive",
      });
      return;
    }

    const selectedCustomer = customers.find(c => c.id === weeklyOrder.customerId);
    if (!selectedCustomer) return;

    setSaving(true);
    try {
      const fullOrder: WeeklyOrder = {
        ...weeklyOrder,
        customerName: selectedCustomer.name,
      };

      const orders = generateOrdersForMonth(fullOrder);

      if (orders.length === 0) {
        toast({
          title: "Warning",
          description: "No orders generated. Please set quantities for at least one day.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("orders")
        .insert(orders);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Generated ${orders.length} orders for ${selectedCustomer.name}.`,
      });

      // Reset form
      setWeeklyOrder({
        customerId: '',
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
        item: 'Milk',
        month: selectedMonth,
        year: selectedYear,
      });

    } catch (error) {
      console.error("Error saving weekly orders:", error);
      toast({
        title: "Error",
        description: "Failed to save weekly orders.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateDayQuantity = (day: string, value: string) => {
    const quantity = parseFloat(value) || 0;
    setWeeklyOrder(prev => ({
      ...prev,
      [day]: quantity
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Weekly Order Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer and Item Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Select
              value={weeklyOrder.customerId}
              onValueChange={(value) => setWeeklyOrder(prev => ({ ...prev, customerId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select customer..." />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="item">Item</Label>
            <Select
              value={weeklyOrder.item}
              onValueChange={(value) => setWeeklyOrder(prev => ({ ...prev, item: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ITEMS.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="month">Month & Year</Label>
            <div className="flex space-x-2">
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => {
                  const month = parseInt(value);
                  setSelectedMonth(month);
                  setWeeklyOrder(prev => ({ ...prev, month }));
                }}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {new Date(0, i).toLocaleDateString('default', { month: 'long' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => {
                  const year = parseInt(value);
                  setSelectedYear(year);
                  setWeeklyOrder(prev => ({ ...prev, year }));
                }}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 3 }, (_, i) => (
                    <SelectItem key={currentDate.getFullYear() + i} value={(currentDate.getFullYear() + i).toString()}>
                      {currentDate.getFullYear() + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Weekly Quantities */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Weekly Quantities (Liters/Units)</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {DAYS.map((day) => (
              <div key={day.key} className="space-y-2">
                <Label htmlFor={day.key} className="text-sm">
                  {day.label}
                </Label>
                <Input
                  id={day.key}
                  type="number"
                  step="0.1"
                  min="0"
                  value={weeklyOrder[day.key as keyof typeof weeklyOrder] || ''}
                  onChange={(e) => updateDayQuantity(day.key, e.target.value)}
                  placeholder="0"
                  className="text-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-muted p-4 rounded-lg">
          <div className="text-sm text-muted-foreground mb-2">Weekly Summary:</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Total per week: </span>
              {(weeklyOrder.monday + weeklyOrder.tuesday + weeklyOrder.wednesday + 
                weeklyOrder.thursday + weeklyOrder.friday + weeklyOrder.saturday + weeklyOrder.sunday).toFixed(1)}
            </div>
            <div>
              <span className="font-medium">Weekdays avg: </span>
              {((weeklyOrder.monday + weeklyOrder.tuesday + weeklyOrder.wednesday + 
                weeklyOrder.thursday + weeklyOrder.friday) / 5).toFixed(1)}
            </div>
            <div>
              <span className="font-medium">Weekend avg: </span>
              {((weeklyOrder.saturday + weeklyOrder.sunday) / 2).toFixed(1)}
            </div>
            <div>
              <span className="font-medium">Orders for month: </span>
              {weeklyOrder.customerId ? 
                generateOrdersForMonth({
                  ...weeklyOrder,
                  customerName: customers.find(c => c.id === weeklyOrder.customerId)?.name || ''
                }).length : 0}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button
            onClick={handleSaveWeeklyOrder}
            disabled={saving || !weeklyOrder.customerId}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Generating Orders..." : "Generate Orders"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}