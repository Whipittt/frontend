import RootLayout from "@/layouts/rootLayout";
import { Helmet } from "react-helmet-async";

const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{`${APP_NAME}`}</title>
      </Helmet>

      <RootLayout>
        <div>
          <h1>Welcome to 9jaFoodie</h1>
        </div>
      </RootLayout>
    </>
  );
}
