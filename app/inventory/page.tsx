import AppShell from "@/components/app-shell";
import DeleteProductCell from "@/components/delete-product-cell";
import Pagination from "@/components/pagination";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Package } from "lucide-react";

type InventoryProduct = {
  id: string;
  name: string;
  sku: string | null;
  price: unknown;
  quantity: number;
  lowStockAt: number | null;
  createdAt: Date;
};

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; deleted?: string; created?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const deletedStatus = params.deleted;
  const createdStatus = params.created;
  const pageSize = 5;

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, items] = (await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        sku: true,
        price: true,
        quantity: true,
        lowStockAt: true,
        createdAt: true,
      },
    }),
  ])) as [number, InventoryProduct[]];

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <AppShell currentPath="/inventory">
      <div className="mb-8">
        <div className="flex items-center justify-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Package className="w-7 h-7 text-purple-600" />
              <span>Inventory</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your products and track inventory levels.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Create feedback */}
        {createdStatus === "1" && (
          <div className="bg-green-50 border border-green-200 text-green-800 dark:bg-green-950/30 dark:border-green-900 dark:text-green-200 px-4 py-3 rounded-lg">
            Product created successfully.
          </div>
        )}
        {createdStatus === "0" && (
          <div className="bg-red-50 border border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-900 dark:text-red-200 px-4 py-3 rounded-lg">
            We could not create this product. Please try again.
          </div>
        )}

        {/* Delete feedback */}
        {deletedStatus === "1" && (
          <div className="bg-green-50 border border-green-200 text-green-800 dark:bg-green-950/30 dark:border-green-900 dark:text-green-200 px-4 py-3 rounded-lg">
            The product was deleted successfully.
          </div>
        )}
        {deletedStatus === "0" && (
          <div className="bg-red-50 border border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-900 dark:text-red-200 px-4 py-3 rounded-lg">
            We could not delete this product. Please try again.
          </div>
        )}

        {/* Search */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <form
            className="flex flex-col sm:flex-row gap-2"
            action="/inventory"
            method="GET"
          >
            <input
              name="q"
              defaultValue={q}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 rounded-lg focus:border-transparent"
            />
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Search
            </button>
          </form>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Low Stock At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {items.map((product, key) => (
                  <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {product.lowStockAt || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      <DeleteProductCell
                        productId={product.id}
                        productName={product.name}
                        q={q}
                        page={page}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/inventory"
              searchParams={{
                q,
                pageSize: String(pageSize),
              }}
            />
          </div>
        )}
      </div>
    </AppShell>
  );
}