import CandidateAPI from "APIs/CandidateAPI";
import { GlobalMainButton } from "Components/GlobalButtons";
import { ErrorToast, SuccessToast } from "Components/HSToast";
import Loading from "Components/Loading";
import Image from "next/future/image";
import Head from "next/head";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CandidateFormActions } from "Redux/CandidateFormSlice";

const ApplyForCandidate = () => {

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const CandidateForm = useSelector((s) => s.CandidateForm);

    const uid = useSelector((s) => s.CurrentAuth?.User?.uid);

    if(!uid) return <Loading />


    const textHandler = ({ target }) => {
        dispatch(CandidateFormActions.setValue({name: target.name, value: target.value}))
    };
    
    const ImageHandler = (e) => {
        dispatch(CandidateFormActions.setValue({name: "image", value: e.target.files[0]}))
    }

    const Upload = async () => {
        setIsLoading(true)

        try {
            await CandidateAPI.UploadCandidate(uid, CandidateForm)
            SuccessToast("Uplaoded..")
        } catch (error) {
            console.log(error)
            ErrorToast("Error Happend")
        }
        
        setIsLoading(false)
    }

    return (
        <div className="ApplyForCandidate">
            <Head>
                <title>UBIT - Apply For CR</title>
            </Head>
            <div className="wrapper">
                <input
                    type="text"
                    name="name"
                    className="name"
                    value={CandidateForm.name}
                    placeholder="Name"
                    onChange={textHandler}
                />
                <input
                    type="text"
                    name="seatNo"
                    className="seatNo"
                    value={CandidateForm.seatNo}
                    placeholder="Seat No"
                    onChange={textHandler}
                />
                <input
                    type="file"
                    name="image"
                    className="image"
                    placeholder=""
                    onChange={ImageHandler}
                    accept="image/*"
                />
                <input
                    type="text"
                    name="description"
                    className="description"
                    value={CandidateForm.description}
                    placeholder="Description"
                    onChange={textHandler}
                />
            </div>
            {
                CandidateForm.image && <div className="image" style={{
                    position: "relative",
                    width: "500px",
                    height: "500px",
                }}>
                    <Image src={ URL.createObjectURL( CandidateForm.image ) } alt="" fill sizes="500px"/>
                </div>
            }
            <GlobalMainButton onClick={Upload} Content="Upload" isLoading={isLoading}/>
        </div>
    );
};

export default ApplyForCandidate;
