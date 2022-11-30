import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import useValidAuth from "../../../../hooks/useAuth";
import { ContainerPage } from "../../../../styles/styles.pagesmain";
import LoginComponent from "../../components/login";

const sessionPage = () => {
  const router = useRouter();

  return (
    <div>
      <ContainerPage>
        <LoginComponent />
      </ContainerPage>
    </div>
  );
};

export default sessionPage;
