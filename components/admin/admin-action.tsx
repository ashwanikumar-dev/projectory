"use client";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  approveProductAction,
  deleteProductionAction,
  rejectProductAction,
} from "@/lib/admin/admin-actions";
import { ProductType } from "@/types";
import { toast } from "sonner";

export async function handleDelete(productId: ProductType["id"]) {
  try {
    await deleteProductionAction(productId);
    toast.success("Product deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete product");
  }
}

export default function AdminActions({
  status,
  productId,
}: {
  status: string;
  productId: ProductType["id"];
}) {
  const handleApprove = async () => {
    try {
      console.log("Approve");
      await approveProductAction(productId);
      toast.success("Product approved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve product");
    }
  };
  const handleReject = async () => {
    try {
      console.log("Reject");
      await rejectProductAction(productId);
      toast.success("Product Rejected successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject product");
    }
  };

  return (
    <div className="space-y-2">
      {status === "pending" && (
        <div className="flex gap-2">
          <Button
            variant="default"
            className="hover:cursor-pointer"
            onClick={handleApprove}
          >
            <CheckCircleIcon className="size-4" />
            Approve
          </Button>
          <Button
            variant="destructive"
            className="hover:cursor-pointer"
            onClick={handleReject}
            size="sm"
          >
            <XCircleIcon className="size-4" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
