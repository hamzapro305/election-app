import Image from "next/future/image";
import { Loading_BUFFER } from "../Assets";
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
            <Image width={300} height={300} src={Loading_BUFFER} alt="" />
        </div>
    );
};

export default Loading;
