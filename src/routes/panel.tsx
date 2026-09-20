import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, Check, PackagePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Məhsul əlavə et — OnlaynShop" },
      {
        name: "description",
        content:
          "OnlaynShop brend paneli: məhsulun adını, qiymətini və ölçülərini doldur, mağazaya əlavə et.",
      },
      { property: "og:title", content: "Məhsul əlavə et — OnlaynShop" },
      {
        property: "og:description",
        content: "Brendlər üçün məhsul əlavə etmə paneli.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PanelPage,
});

function PanelPage() {
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("S, M, L, XL");
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);

  const request = useMemo(() => {
    const lines = [
      "Mağazaya yeni məhsul əlavə et:",
      `Brend: ${brand || "—"}`,
      `Ad: ${title || "—"}`,
      `Qiymət: ${price || "—"}`,
      `Ölçülər: ${sizes || "—"}`,
      `Təsvir: ${description || "—"}`,
    ];
    return lines.join("\n");
  }, [brand, title, price, sizes, description]);

  const isReady = title.trim() !== "" && price.trim() !== "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(request);
      setCopied(true);
      toast.success("Kopyalandı", { description: "Mətni çata yapışdırın." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Kopyalamaq alınmadı", { description: "Mətni əl ilə seçib kopyalayın." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <PackagePlus className="h-3.5 w-3.5 text-primary" /> Brend paneli
        </span>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">Məhsul əlavə et</h1>
        <p className="mt-3 text-muted-foreground">
          Məhsulun məlumatlarını doldurun, hazır mətni kopyalayıb çata göndərin — məhsul dərhal
          mağazaya və vitrinə əlavə olunacaq. Məhsulun şəklini də çata əlavə edə bilərsiniz.
        </p>

        <div className="mt-8 grid gap-5 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-2">
            <Label htmlFor="brand">Brend adı</Label>
            <Input
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Məsələn: Nova Basics"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Məhsulun adı</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Məsələn: Oversize pambıq t-şört"
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="price">Qiymət</Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Məsələn: 49"
                inputMode="decimal"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sizes">Ölçülər</Label>
              <Input
                id="sizes"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                placeholder="S, M, L, XL"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Təsvir</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Parça, kəsim və digər detallar"
              rows={4}
            />
          </div>

          <div className="rounded-xl border border-dashed border-border bg-background p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Çata göndəriləcək mətn
            </p>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-foreground">{request}</pre>
          </div>

          <Button onClick={handleCopy} disabled={!isReady} size="lg">
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Kopyalandı" : "Mətni kopyala"}
          </Button>
        </div>
      </main>
    </div>
  );
}
