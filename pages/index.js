import Head from "next/head";
import AuthActions from "../Firebase/AuthActions";

const Home = () => {
  
  const SignIn = () => {
    AuthActions.signInWithGoogle()
  }
  return (
    <div className="Home">
      <Head>
        <title>Home</title>
      </Head>
      <button onClick={SignIn}>Sign in With Google</button>
    </div>
  );
};

export default Home;
