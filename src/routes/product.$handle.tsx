import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Loader2, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  head: () => ({
    meta: [
      { title: "Məhsul — OnlaynShop" },
      { name: "description", content: "OnlaynShop mağazasında geyim məhsulunun detalları, qiyməti və ölçüləri." },
      { property: "og:title", content: "Məhsul — OnlaynShop" },
      { property: "og:description", content: "OnlaynShop-da geyim məhsulunun detalları və qiyməti." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [variantIndex, setVariantIndex] = useState(0);

  const { data: product, isPending } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  const node = product?.node;
  const variants = node?.variants.edges ?? [];
  const selectedVariant = variants[variantIndex]?.node;
  const image = node?.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Səbətə əlavə olundu", { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Geri
        </Link>

        {isPending ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !node ? (
          <p className="text-muted-foreground">Məhsul tapılmadı.</p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
              {image ? (
                <img src={image.url} alt={image.altText ?? node.title} className="aspect-4/5 w-full object-cover" />
              ) : (
                <div className="flex aspect-4/5 items-center justify-center text-muted-foreground">
                  <ShoppingBag className="h-12 w-12" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl font-semibold tracking-tight">{node.title}</h1>
              <p className="text-2xl font-semibold text-primary">
                {selectedVariant
                  ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                  : formatPrice(
                      node.priceRange.minVariantPrice.amount,
                      node.priceRange.minVariantPrice.currencyCode,
                    )}
              </p>
              <p className="whitespace-pre-line text-muted-foreground">{node.description}</p>

              {variants.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <button
                      key={v.node.id}
                      onClick={() => setVariantIndex(i)}
                      disabled={!v.node.availableForSale}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors disabled:opacity-40 ${
                        i === variantIndex
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:bg-accent"
                      }`}
                    >
                      {v.node.title}
                    </button>
                  ))}
                </div>
              )}

              <Button size="lg" onClick={handleAddToCart} disabled={isLoading || !selectedVariant}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Səbətə at"}
              </Button>

              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 text-primary" />
                Öz çatdırılma xidmətimizlə sifarişiniz qapınıza çatdırılır.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
