import "../styles/globals.css";
import { Provider } from "use-http";
function MyApp({ Component, pageProps }) {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
    },
  };
  return (
    <>
      <Provider options={options}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
