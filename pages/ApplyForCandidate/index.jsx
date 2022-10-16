import CandidateAPI from "APIs/CandidateAPI";
import { GlobalMainButton } from "Components/GlobalButtons";
import { ErrorToast, SuccessToast, WarnToast } from "Components/HSToast";
import Loading from "Components/Loading";
import Image from "next/future/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CandidateFormActions } from "Redux/CandidateFormSlice";

const ApplyForCandidate = () => {

    const [status, setStatus]= useState("null")

    const [isLoading, setIsLoading] = useState(false);

    const canApply = useSelector(s => s.GlobalVariables.realTime.canApply)

    const dispatch = useDispatch();

    const router = useRouter()

    const ImgRef = useRef()

    const CandidateForm = useSelector((s) => s.CandidateForm);

    const uid = useSelector((s) => s.CurrentAuth?.User?.uid);

    useEffect(() => {
        if(canApply === false){
          WarnToast("Application Limit Exceed")
        }
      }, [canApply])


    useEffect(() => {
        const getData = async (UID) => {
            try {
                const Data = await CandidateAPI.getCandidateFormData(UID)
                if (Data) {
                    dispatch(
                        CandidateFormActions.setForm({
                            name: Data.name,
                            seatNo: Data.seatNo,
                            image: Data.image,
                            description: Data.description,
                            gender: Data.gender,
                        })
                    )
                    setStatus(Data.status)
                }
            } catch (error) {
                console.log(error)
            }
            SuccessToast("Form Loaded")
        }
        if(uid) getData(uid)
    }, [dispatch, uid])

    if (!uid || canApply === null) return <Loading />;

    if(canApply === false) router.push("/")

    const textHandler = ({ target }) => {
        dispatch(
            CandidateFormActions.setValue({
                name: target.name,
                value: target.value,
            })
        );
    };

    if(status === "accepted") {
        WarnToast("You Can't Change Your Info Anymore")
        return <FormSubmitted  CandidateForm={CandidateForm} />
    }

    const setGender = (Gender) => {
        dispatch(
            CandidateFormActions.setValue({
                name: "gender",
                value: Gender
            })
        )
    }

    const ImageHandler = (e) => {
        dispatch(
            CandidateFormActions.setValue({
                name: "image",
                value: e.target.files[0],
            })
        );
    };

    const Upload = async () => {
        if(status === "accepted") {
            WarnToast("You Can't Change Your Info Anymore")
            return
        }
        setIsLoading(true);

        try {
            await CandidateAPI.UploadCandidate(uid, CandidateForm);
            SuccessToast("Uplaoded..");
            router.push('/')
        } catch (error) {
            console.log(error);
            ErrorToast("Error Happend");
        }

        setIsLoading(false);
    };
    const getImage = (img) => {
        if(typeof img === "string"){
            return img;
        }else{
            return URL.createObjectURL(img)
        }
    }

    return (
        <div className="ApplyForCandidate">
            <Head>
                <title>UBIT - Apply For CR</title>
            </Head>
            <div className="wrapper">
                <div className="Modal">
                    <div className="input">
                        <p className="MF">Your Full Name</p>
                        <input
                            type="text"
                            name="name"
                            className="name"
                            value={CandidateForm.name}
                            placeholder="Name"
                            onChange={textHandler}
                        />
                    </div>
                    <div className="input">
                        <p className="MF">Enter Seat No</p>
                        <input
                            type="text"
                            name="seatNo"
                            className="seatNo"
                            value={CandidateForm.seatNo}
                            placeholder="Seat No"
                            onChange={textHandler}
                        />
                    </div>
                    <div className="input">
                        <p className="MF">Gender</p>
                        <div className="actions">
                            <button className={CandidateForm.gender === "male" ? "active" : ""} onClick={e => setGender("male")}>Male</button>
                            <button className={CandidateForm.gender === "female" ? "active" : ""} onClick={e => setGender("female")}>Female</button>
                        </div>
                    </div>
                    <div className="input">
                        <p className="MF">Image {`(Optional)`}</p>
                        {CandidateForm.image && (
                            <div
                                className="selected-image"
                                style={{
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src={getImage(CandidateForm.image)}
                                    alt="" fill sizes="500px"
                                    style={{objectFit: "cover"}}
                                />
                            </div>
                        )}
                        <button onClick={() => ImgRef.current.click()}>Select Image</button>
                        <input
                            type="file"
                            style={{display: "none"}}
                            name="image"
                            className="image"
                            placeholder=""
                            onChange={ImageHandler}
                            accept="image/*"
                            ref={ImgRef}
                        />
                    </div>
                    <div className="input">
                        <p className="MF">Description to show</p>
                        <textarea
                            type="text"
                            name="description"
                            className="description"
                            value={CandidateForm.description}
                            placeholder="Description"
                            onChange={textHandler}
                            rows={4}
                        />
                    </div>
                    <GlobalMainButton
                        onClick={Upload}
                        Content="Submit"
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

const FormSubmitted = () => {
    return <div className="FormSubmitted">
        
    </div>
}

export default ApplyForCandidate;
