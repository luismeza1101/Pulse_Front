import Image from "next/image";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-full flex">
      {/* <!-- Sección izquierda con imagen de fondo --> */}
      <section className="w-[40%] h-full hidden desktop:block xl:w-[60%] relative">
        <Image
          src="/imgs/fondo.webp"
          alt="Background image"
          layout="fill"
          objectFit="cover"
        />
      </section>
      <section className="h-full w-full flex flex-col justify-center relative desktop:w-[60%] xl:w-[40%]">
        <h1 id="login-title" className="absolute top-6 left-12 font-extrabold text-3xl">
          PULSE
        </h1>
        {children}
      </section>
    </main>
  );
}
