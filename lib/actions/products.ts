"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

export async function deleteProduct(formData: FormData) {
  const user = await getCurrentUser();
  const id = String(formData.get("id") || "");

  const result = await prisma.product.deleteMany({
    where: { id: id, userId: user.id },
  });

  return result.count;
}

export async function deleteProductWithRedirect(formData: FormData) {
  const q = String(formData.get("q") || "").trim();
  const page = Math.max(1, Number(formData.get("page") || 1));

  // IMPORTANT: next/navigation redirect() throws. Keep it OUTSIDE try/catch.
  // Treat deletion as idempotent: if the item is already gone (e.g. double-submit), show success.
  let deleted = "0";

  const id = String(formData.get("id") || "");

  try {
    const user = await getCurrentUser();

    const result = await prisma.product.deleteMany({
      where: { id, userId: user.id },
    });

    if (result.count > 0) {
      deleted = "1";
    } else {
      // If it doesn't exist anymore for this user, consider the delete successful.
      const stillExists = await prisma.product.findFirst({
        where: { id, userId: user.id },
        select: { id: true },
      });
      deleted = stillExists ? "0" : "1";
    }
  } catch (err) {
    console.error("deleteProductWithRedirect failed", err);

    // The delete might have succeeded but the request errored afterwards.
    try {
      const user = await getCurrentUser();
      const stillExists = await prisma.product.findFirst({
        where: { id, userId: user.id },
        select: { id: true },
      });
      deleted = stillExists ? "0" : "1";
    } catch {
      deleted = "0";
    }
  }

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  params.set("page", String(page));
  params.set("deleted", deleted);

  redirect(`/inventory?${params.toString()}`);
}

export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  await prisma.product.create({
    data: {
      ...parsed.data,
      // Prisma expects Decimal-compatible values for Decimal columns.
      price: new Prisma.Decimal(parsed.data.price.toFixed(2)),
      userId: user.id,
    },
  });
}

export async function createProductWithRedirect(formData: FormData) {
  // IMPORTANT: next/navigation redirect() throws. Do not catch it.
  try {
    await createProduct(formData);
  } catch (err) {
    // Avoid surfacing an error page for form submissions; redirect back with a flag.
    console.error("createProductWithRedirect failed", err);
    redirect("/add-product?created=0");
  }

  redirect("/inventory?created=1");
}
