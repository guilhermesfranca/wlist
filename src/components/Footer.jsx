import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 mt-10 bottom-0 w-full">
      <div className="container mx-auto text-center text-sm">
        <p>
          Desenvolvido por <Link href="https://www.linkedin.com/in/guilhermesfranca/" target="_blank"><span className="underline font-semibold">Guilherme França</span></Link> © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
