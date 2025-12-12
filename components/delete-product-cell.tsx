"use client";

import { useState, useRef } from "react";
import { deleteProductWithRedirect } from "@/lib/actions/products";

type DeleteProductCellProps = {
  productId: string;
  productName: string;
  q: string;
  page: number;
};

export default function DeleteProductCell({
  productId,
  productName,
  q,
  page,
}: DeleteProductCellProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleInitialClick = () => {
    setIsConfirming(true);
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  const handleConfirm = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="space-y-2">
      {!isConfirming ? (
        <button
          type="button"
          onClick={handleInitialClick}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      ) : (
        <div className="space-y-2">
          <div className="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg text-sm">
            Are you sure you want to delete &quot;{productName}&quot;?
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <form ref={formRef} action={deleteProductWithRedirect} className="hidden">
        <input type="hidden" name="id" value={productId} />
        <input type="hidden" name="q" value={q} />
        <input type="hidden" name="page" value={String(page)} />
      </form>
    </div>
  );
}
