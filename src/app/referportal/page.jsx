"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Share2,
  Gift,
  Users,
  Copy,
  Check,
  LoaderCircle,
  TrendingUp,
  PoundSterling,
  UserCheck,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { useUserReferralData, useCurrentUserProfile } from "@/hooks/useUser";
import { toast } from "sonner";
import RouteProtection from "@/components/RouteProtection";

export default function ReferralPortalPage() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { user, loading: authLoading } = useAuth();

  const {
    data: referralData,
    isLoading: referralLoading,
    error: referralError,
  } = useUserReferralData(user?.uid);

  const {
    data: userProfile,
    isLoading: profileLoading,
  } = useCurrentUserProfile(user?.uid);

  const copyToClipboard = () => {
    if (referralData?.referralCode) {
      navigator.clipboard.writeText(referralData.referralCode);
      setCopiedCode(true);
      toast.success("Referral code copied to clipboard!");
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    // Handle Firestore timestamp objects
    if (dateString && typeof dateString === 'object' && dateString.seconds) {
      const date = new Date(dateString.seconds * 1000 + (dateString.nanoseconds || 0) / 1000000);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    // Handle regular date strings
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString.toDate();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return `£${amount?.toFixed(2) || "0.00"}`;
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "rewarded":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Show loading state
  if (authLoading || referralLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="w-8 h-8 animate-spin text-gray-600" />
          <p className="text-gray-600">Loading your referral portal...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (referralError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Referral Data
          </h2>
          <p className="text-gray-600 mb-4">{referralError.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const userData = userProfile || {};
  const referrals = userData.referrals || [];
  const rewards = userData.rewards || [];
  const totalReferralRewards = userData.referralRewards || 0;

  // Calculate stats
  const stats = {
    totalReferrals: referrals.length,
    totalRewards: totalReferralRewards,
    pendingRewards: rewards.filter(r => r.status === "pending").length,
    approvedRewards: rewards.filter(r => r.status === "approved").length,
    rejectedRewards: rewards.filter(r => r.status === "rejected").length,
  };

  return (
    <RouteProtection allowedRoles={["user", "admin"]}>
      <div className="min-h-screen bg-gray-100 mt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white max-w-7xl mx-auto rounded-3xl shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Referral Portal
                </h1>
                <p className="text-gray-300 text-lg">
                  Manage your referrals and track your rewards
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[120px] text-center border border-white/20">
                <div className="text-2xl md:text-3xl font-bold">
                  {formatCurrency(totalReferralRewards)}
                </div>
                <div className="text-sm text-gray-300">Total Earned</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-gray-700" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalReferrals}
              </div>
              <div className="text-sm text-gray-600">Total Referrals</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.pendingRewards}
              </div>
              <div className="text-sm text-gray-600">Pending Rewards</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-gray-700" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.approvedRewards}
              </div>
              <div className="text-sm text-gray-600">Approved Rewards</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 text-white">
              <div className="flex items-center justify-between mb-2">
                <PoundSterling className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(stats.totalRewards)}
              </div>
              <div className="text-sm text-gray-300">Total Earned</div>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-300 mb-8">
            <div className="border-b border-gray-300 bg-gray-50 rounded-t-lg">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "overview", label: "Overview", icon: TrendingUp },
                  { id: "referrals", label: "My Referrals", icon: Users },
                  { id: "rewards", label: "Rewards History", icon: Gift },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-gray-900 text-gray-900 bg-white -mb-px"
                        : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 bg-white rounded-b-lg">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Your Referral Code */}
                  <Card className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-400 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-gray-700" />
                      Your Referral Code
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Share this code with friends
                        </label>
                        <div className="flex items-center gap-3">
                          <div className="bg-white px-6 py-4 rounded-lg font-mono text-2xl flex-1 text-center border-2 border-gray-300 shadow-inner font-bold tracking-wider">
                            {referralData?.referralCode || "Loading..."}
                          </div>
                          <Button
                            onClick={copyToClipboard}
                            className="px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                            disabled={!referralData?.referralCode}
                          >
                            {copiedCode ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Code
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-lg">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white text-lg">
                            💰 How to Earn Cash Rewards
                          </h4>
                          <div className="space-y-2 text-sm text-gray-200">
                            <div className="flex items-start gap-3">
                              <span className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                              <p><strong>Share your code:</strong> Give your referral code to friends and family</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                              <p><strong>They get a discount:</strong> Your friends save 5% on their treatment when using your code</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                              <p><strong>You earn cash:</strong> Receive 5% of their treatment cost as cash reward!</p>
                            </div>
                          </div>
                          <div className="mt-4 p-3 bg-green-800 rounded-lg border border-green-700">
                            <p className="text-green-100 text-sm font-medium">
                              ✨ <strong>Example:</strong> Friend books £300 treatment → They pay £285 (save £15) → You earn £15 cash!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Sharing Tips */}
                  <Card className="p-6 shadow-lg border border-gray-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-gray-700" />
                      Ways to Share Your Code
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                          📱 Social Media
                        </h4>
                        <p className="text-sm text-blue-800">
                          Share your code on WhatsApp, Instagram, Facebook, or other social platforms
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                          💬 Direct Message
                        </h4>
                        <p className="text-sm text-green-800">
                          Send your code directly to friends via text or messaging apps
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                          👥 Word of Mouth
                        </h4>
                        <p className="text-sm text-purple-800">
                          Tell friends and family about your experience and share your code
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                          ✉️ Email
                        </h4>
                        <p className="text-sm text-orange-800">
                          Email your code to friends who might be interested in treatments
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="p-6 shadow-lg border border-gray-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    {referrals.length === 0 && rewards.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          No referral activity yet
                        </p>
                        <p className="text-sm text-gray-500">
                          Start sharing your code to see activity here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {rewards.slice(0, 5).map((reward, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-300 hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-full shadow-md">
                                <Gift className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  Reward for {reward.referredUserName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {reward.treatmentName} •{" "}
                                  {formatDate(reward.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                {formatCurrency(reward.rewardAmount)}
                              </p>
                              <Badge
                                className={`${getStatusBadgeColor(
                                  reward.status
                                )} border text-xs`}
                              >
                                {reward.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {/* Referrals Tab */}
              {activeTab === "referrals" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border border-gray-300">
                    <h3 className="text-xl font-semibold text-gray-900">
                      My Referrals
                    </h3>
                    <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-300">
                      Total: {referrals.length} referrals
                    </div>
                  </div>

                  {referrals.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-300">
                      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        No referrals yet
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Start sharing your referral link to see your referrals
                        here
                      </p>
                    </div>
                  ) : (
                    <Card className="shadow-lg border border-gray-300">
                      <Table>
                        <TableHeader className="bg-gray-100">
                          <TableRow>
                            <TableHead className="text-gray-900 font-semibold">Referred User</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Date Joined</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Appointment</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Reward Earned</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {referrals.map((referral, index) => (
                            <TableRow key={index} className="hover:bg-gray-100 transition-colors duration-200">
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8 border-2 border-gray-300">
                                    <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-900 text-white text-xs">
                                      {referral.referredEmail
                                        ?.charAt(0)
                                        ?.toUpperCase() || "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {referral.referredEmail || "New User"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      ID: {referral.referredUserId?.slice(0, 8)}
                                      ...
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-gray-600">
                                {formatDate(referral.createdAt)}
                              </TableCell>
                              <TableCell className="text-sm text-gray-600">
                                {referral.appointmentNumber ? (
                                  <div>
                                    <p className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                      {referral.appointmentNumber}
                                    </p>
                                    <Badge className="bg-gray-800 text-white border-gray-600 text-xs mt-1">
                                      Appointment Booked
                                    </Badge>
                                  </div>
                                ) : (
                                  <Badge className="bg-gray-500 text-white border-gray-400 text-xs">
                                    No appointment yet
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {(() => {
                                  // Find corresponding reward for this referral
                                  const correspondingReward = rewards.find(
                                    (reward) =>
                                      reward.referredUserId ===
                                      referral.referredUserId
                                  );

                                  if (correspondingReward) {
                                    return (
                                      <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                          {formatCurrency(
                                            correspondingReward.rewardAmount
                                          )}
                                        </p>
                                        <Badge
                                          className={`${getStatusBadgeColor(
                                            correspondingReward.status
                                          )} border text-xs mt-1`}
                                        >
                                          {correspondingReward.status}
                                        </Badge>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <span className="text-sm text-gray-500">
                                        No reward yet
                                      </span>
                                    );
                                  }
                                })()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  )}
                </div>
              )}

              {/* Rewards Tab */}
              {activeTab === "rewards" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border border-gray-300">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Rewards History
                    </h3>
                    <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-300">
                      Total Earned: {formatCurrency(totalReferralRewards)}
                    </div>
                  </div>

                  {rewards.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-300">
                      <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        No rewards yet
                      </h4>
                      <p className="text-gray-600 mb-4">
                        You'll see your referral rewards here once your friends
                        complete their treatments
                      </p>
                    </div>
                  ) : (
                    <Card className="shadow-lg border border-gray-300">
                      <Table>
                        <TableHeader className="bg-gray-100">
                          <TableRow>
                            <TableHead className="text-gray-900 font-semibold">Referred User</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Treatment</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Reward Amount</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Status</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rewards.map((reward, index) => (
                            <TableRow key={index} className="hover:bg-gray-100 transition-colors duration-200">
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {reward.referredUserName}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {reward.referredUserEmail}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {reward.treatmentName}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Cost: {reward.treatmentCost}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="font-bold text-gray-900">
                                  {formatCurrency(reward.rewardAmount)}
                                </p>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={`${getStatusBadgeColor(
                                    reward.status
                                  )} border`}
                                >
                                  {reward.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-600">
                                {formatDate(reward.createdAt)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RouteProtection>
  );
}
