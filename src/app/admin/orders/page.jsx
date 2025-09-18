"use client";
import { useState, useEffect } from "react";
import {
  useOrdersData,
  useUpdateOrderStatus,
  useDeleteOrder,
} from "@/hooks/useOrder";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  ShoppingBag,
  PoundSterling,
  Package,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import OrderCard from "./_components/OrderCard";
import OrderDetailsModal from "./_components/OrderDetailsModal";

// Utility function to convert Firestore timestamp to Date
const convertTimestamp = (timestamp) => {
  if (!timestamp) return null;

  // If it's already a Date object, return it
  if (timestamp instanceof Date) return timestamp;

  // If it's a Firestore timestamp object
  if (timestamp && typeof timestamp === "object" && timestamp.seconds) {
    return new Date(
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
    );
  }

  // If it's a string, try to parse it
  if (typeof timestamp === "string") {
    return new Date(timestamp);
  }

  return null;
};

// Utility function to process order data and convert timestamps
const processOrderData = (orders) => {
  return orders.map((order) => ({
    ...order,
    createdAt: convertTimestamp(order.createdAt),
    updatedAt: convertTimestamp(order.updatedAt),
    paidAt: convertTimestamp(order.paidAt),
    products:
      order.products?.map((product) => ({
        ...product,
        addedAt: convertTimestamp(product.addedAt),
      })) || [],
  }));
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: ordersData, isLoading, error, refetch } = useOrdersData(true); // Pass true to get all orders (admin view)

  const updateStatusMutation = useUpdateOrderStatus();
  const deleteOrderMutation = useDeleteOrder();

  const orders = ordersData?.orders ? processOrderData(ordersData.orders) : [];

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      !debouncedSearch ||
      order.orderNumber
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      order.userDetails?.name
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      order.userDetails?.email
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      order.id?.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    const matchesPaymentStatus =
      paymentStatusFilter === "all" ||
      (paymentStatusFilter === "paid" &&
        (order.paymentStatus === "paid" ||
          order.paymentStatus === "completed")) ||
      (paymentStatusFilter === "pending" &&
        order.paymentStatus !== "paid" &&
        order.paymentStatus !== "completed");

    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    paidOrders: orders.filter(
      (o) => o.paymentStatus === "paid" || o.paymentStatus === "completed"
    ).length,
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status });
      toast.success(`Order status updated to ${status}! 📦`);
    } catch (error) {
      toast.error(error.message || "Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (
      !confirm(
        "Are you sure you want to delete this order? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteOrderMutation.mutateAsync({ orderId });
      toast.success("Order deleted successfully! 🗑️");
    } catch (error) {
      toast.error(error.message || "Failed to delete order");
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount || 0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            Loading Orders...
          </div>
          <div className="text-gray-500">
            Please wait while we fetch the data
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">Error loading orders</div>
        <Button onClick={() => refetch()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8" />
              Order Management
            </h1>
            <p className="text-gray-300 text-base sm:text-lg">
              Track and manage customer orders
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[140px] text-center border border-white/20">
            <div className="text-2xl sm:text-3xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-300">Total Orders</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <ShoppingBag className="w-8 h-8 text-gray-700" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.total}
          </div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <PoundSterling className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(stats.totalRevenue)}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 text-white">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div className="text-2xl font-bold text-white">
            {stats.paidOrders}
          </div>
          <div className="text-sm text-gray-300">Paid Orders</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {stats.delivered}
          </div>
          <div className="text-sm text-gray-600">Delivered</div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-300">
        <h3 className="font-semibold text-gray-900 mb-4">
          Order Status Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.processing}
            </div>
            <div className="text-sm text-gray-600">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">
              {stats.shipped}
            </div>
            <div className="text-sm text-gray-600">Shipped</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.delivered}
            </div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.cancelled}
            </div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-300">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders by number, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent w-full sm:w-auto"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent w-full sm:w-auto"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending Payment</option>
              </select>
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-300 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Orders Found
          </h3>
          <p className="text-gray-600">
            {searchTerm ||
            statusFilter !== "all" ||
            paymentStatusFilter !== "all"
              ? "No orders match your current filters"
              : "No orders have been placed yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onView={handleViewOrder}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteOrder}
              isUpdating={updateStatusMutation.isPending}
              isDeleting={deleteOrderMutation.isPending}
            />
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
