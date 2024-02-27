import Decor from "./components/main/Decor";
import Name from "./components/main/Name";

export default function Home() {
  return (
    <main className="flex relative min-h-screen flex-col items-start justify-center p-24 border border-black overflow-hidden">
      <Name />
      <div className="absolute w-full h-full z-0">
        <Decor />
      </div>
    </main>
  );
}
