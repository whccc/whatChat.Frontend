import Link from "next/link";
const loginPage = () => {
  return (
    <div>
      <div>
        <label>Usuario</label>
        <input type="text" />
        <button>
          <Link href="/Login/Register">Registro</Link>
        </button>
      </div>
    </div>
  );
};

export default loginPage;
