import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Student({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}
