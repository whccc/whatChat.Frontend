import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Bienvenidos Chat WHC</h1>
      <button>
        <Link href="/Login">Iniciar Sessio</Link>
      </button>
    </div>
  );
};

export default Home;
