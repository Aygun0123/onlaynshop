import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Truck, Store, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { ProductCard } from "@/components/ProductCard";
import { useCartSync } from "@/hooks/useCartSync";
import { fetchProducts } from "@/lib/shopify";
import logo from "@/assets/onlaynshop-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OnlaynShop — Brendlərin onlayn geyim platforması" },
      {
        name: "description",
        content:
          "OnlaynShop — mağazaların öz brendini yerləşdirdiyi geyim platforması. Öz çatdırılma xidmətimizlə sifarişiniz qapınıza çatır.",
      },
      { property: "og:title", content: "OnlaynShop — Brendlərin onlayn geyim platforması" },
      {
        property: "og:description",
        content: "Brendlər öz mağazasını açır, biz çatdırırıq. Geyim alışverişi bir platformada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useCartSync();
  const { data: products = [], isPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(50),
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Store className="h-3.5 w-3.5 text-primary" /> Brendlər üçün onlayn platforma
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Geyim brendləri üçün bir <span className="text-primary">onlayn mağaza</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Mağazalar öz brendini bura əlavə edir, alıcılar tək yerdən sifariş verir. Çatdırılma bizim
              öz xidmətimizlə həyata keçirilir.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#mehsullar">
                  Məhsullara bax <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#brendler">Brendini əlavə et</a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={logo} alt="OnlaynShop loqosu" width={280} height={280} className="w-56 md:w-72" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3">
        {[
          { icon: Store, title: "Öz brendin", text: "Mağazalar öz məhsullarını platformaya yerləşdirir." },
          { icon: Truck, title: "Öz çatdırılmamız", text: "Sifarişləri biz yığır və ünvana çatdırırıq." },
          { icon: ShieldCheck, title: "Təhlükəsiz ödəniş", text: "Ödəniş Shopify üzərindən qorunur." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6">
            <Icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section id="mehsullar" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Məhsullar</h2>
            <p className="mt-1 text-muted-foreground">Platformadakı geyim kolleksiyası</p>
          </div>
        </div>

        {isPending ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-medium">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hələ məhsul yoxdur. Çatda məhsulun adını və qiymətini yazın, sizin üçün əlavə edim.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section id="brendler" className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold tracking-tight">Brendini əlavə et</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Mağazanız varsa, kolleksiyanızı OnlaynShop-da yerləşdirə bilərsiniz. Məhsullarınız platformada
            görünür, sifarişlər isə bizim çatdırılma xidmətimizlə müştəriyə çatır.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { step: "01", title: "Müraciət et", text: "Brendin adı və kateqoriyası ilə bizə yazın." },
              { step: "02", title: "Məhsulları yüklə", text: "Şəkil, qiymət və ölçüləri platformaya əlavə edirik." },
              { step: "03", title: "Satışa başla", text: "Sifarişlər gəldikcə biz yığır və çatdırırıq." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-semibold text-primary">{s.step}</span>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
          <Button className="mt-8" size="lg" asChild>
            <a href="mailto:info@onlaynshop.az">Brend kimi müraciət et</a>
          </Button>
        </div>
      </section>

      <section id="catdirilma" className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <Truck className="h-8 w-8 text-primary" />
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Çatdırılma xidmətimiz</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Sifarişləri brend mağazalardan özümüz yığırıq və müştəriyə çatdırırıq. Bakı daxili sürətli
            çatdırılma, regionlara isə kuryer xidməti ilə göndəriş mövcuddur.
          </p>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} OnlaynShop — bütün hüquqlar qorunur.
      </footer>
    </div>
  );
}
