import CursorMagic from "./components/main/CursorMagic";
import Decor from "./components/main/Decor";
import Name from "./components/main/Name";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden lg:p-24">
      <CursorMagic />
      <Name />
      <div className="absolute z-0 h-full w-full">
        <Decor />
      </div>
    </main>
  );
}
