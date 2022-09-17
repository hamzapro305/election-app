import Image from "next/image";
import LoadingGIF from "../Assets/Loading.gif";
const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image width={300} height={300} src={LoadingGIF} />
    </div>
  );
};

export default Loading;
