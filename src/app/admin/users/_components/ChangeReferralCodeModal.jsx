import { useState } from "react";
import { useUpdateUserReferralCode } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { X } from "lucide-react";

export function ChangeReferralCodeModal({ userId, currentCode, isOpen, onClose }) {
  const [newCode, setNewCode] = useState("");
  const updateReferralCode = useUpdateUserReferralCode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newCode.trim()) {
      toast.error("Please enter a referral code");
      return;
    }

    try {
      await updateReferralCode.mutateAsync({
        userId,
        referralCode: newCode.trim(),
      });
      toast.success("Referral code updated successfully");
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Change Referral Code</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Code
            </label>
            <Input
              value={currentCode || "No code assigned"}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Referral Code
            </label>
            <Input
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Enter new referral code"
              className="mb-2"
            />
            <p className="text-sm text-gray-500">
              Enter a unique code for this user
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={updateReferralCode.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateReferralCode.isPending}
            >
              {updateReferralCode.isPending ? "Updating..." : "Update Code"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
