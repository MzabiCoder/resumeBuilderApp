/** No site chrome — used for template preview rendering (screenshots). */
export default function BareLayout({ children }: LayoutProps<"/">) {
  return (
    <main id="main" tabIndex={-1} className="flex-1 bg-[#e9e6df] p-0">
      {children}
    </main>
  );
}
