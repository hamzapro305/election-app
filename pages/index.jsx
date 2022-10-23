import Image from "next/future/image";
import Head from "next/head";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import FadePageWrapper from "../Components/FadePageWrapper";
import { useEffect, useState } from "react";
import { GlobalLightButton } from "Components/GlobalButtons";
import VotesApi from "APIs/VotesApi";
import { ErrorToast } from "Components/HSToast";
import Loading from "Components/Loading";
import { useRouter } from "next/router";
import DEFAULT_AVATAR from "Assets/DEFAULT_AVATAR.jpg"

const Home = () => {

    const Candidates = useSelector((s) => s.Candidate.Candidates);

    const canVote = useSelector(s => s.GlobalVariables.realTime.canVote)

    const [Selected, setSelected] = useState(null)

    const { User, isMaleVoteSubmitted, isFemaleVoteSubmitted } = useSelector((s) => s.CurrentAuth);

    const router = useRouter()

    useEffect(() => {
      if(canVote === false){
        router.push("/ApplyForCandidate")
      }
    }, [canVote, router])
    

    if(!User || !Candidates || canVote === null) return <Loading /> 

    
    return (
        <FadePageWrapper>
            <motion.div layout className="Home" onClick={(e) => {
                setSelected(null)
            }}>
                <Head>
                    <title>Home</title>
                </Head>
                <div className="main-title MF">Male Candidates {isMaleVoteSubmitted ? `(Vote Submitted)` : ""}</div>
                <motion.div layout className="Male-Candidates Candidates">
                    {Candidates ?
                        Candidates.filter(x => x.gender === "male").map((x, j) => (
                            <Candidate key={x.id} candidate={x} rand={j} setSelected={setSelected}/>
                        )) : <LoadingComp />}
                </motion.div>

                <div className="main-title MF">Female Candidates {isFemaleVoteSubmitted ? `(Vote Submitted)` : ""}</div>
                <motion.div layout className="Female-Candidates Candidates">
                    {Candidates ?
                        Candidates.filter(x => x.gender === "female").map((x, j) => (
                            <Candidate key={x.id} candidate={x} rand={j} setSelected={setSelected}/>
                        )) : <LoadingComp />}
                </motion.div>
                <AnimatePresence>
                    {Selected && <CandidatePreview Selected={Selected} setSelected={setSelected}/>}
                </AnimatePresence>
            </motion.div>
        </FadePageWrapper>
    );
};

const Candidate = ({ candidate, rand, setSelected }) => (
    <motion.div className="candidate" layout layoutId={candidate.id} onClick={(e) => {
        e.stopPropagation()
        setSelected(candidate)
    }}> 
        <div
            className="overlay"
            style={{
                backgroundColor: Colors[rand],
            }}
        />
        <motion.div className="seatNo" layout="position" layoutId={candidate.id + "" + candidate.seatNo}>Seat No: {candidate.seatNo}</motion.div>
        <motion.div className="image" layoutId={candidate.id + "image"}>
            <Image src={!!candidate.image ? candidate.image : DEFAULT_AVATAR} fill alt="" sizes="50px" />
        </motion.div>
        <div className="info">
            <motion.div layout="position" className="name" layoutId={candidate.id + "name"}>{candidate.name}</motion.div>
            <motion.div layout="position" className="desc" layoutId={candidate.id + "desc"}>{candidate.description.slice(0, 100)}...</motion.div>
        </div>
    </motion.div>
)

const CandidatePreview = ({ Selected, setSelected }) => {

    const { User, isMaleVoteSubmitted, isFemaleVoteSubmitted } = useSelector((s) => s.CurrentAuth);

    const Votes = useSelector((s) => s.Votes.AllVotes);

    const GetVotes = (id) => {
        if(Selected.gender === "male") return (Votes.filter(x => x.toMale === id)).length
        if(Selected.gender === "female") return (Votes.filter(x => x.toFemale === id)).length
        else return 0
    }

    const isSubmitted = (gender) => {
        if(gender === "male") {
            if(isMaleVoteSubmitted){
                return true;
            }else{
                return false;
            }
        }
        if(gender === "female") {
            if(isFemaleVoteSubmitted){
                return true;
            }else{
                return false;
            }
        }
    }

    const SendVote = () => {
            const { id, gender } = Selected
            if(isSubmitted(gender)){
                ErrorToast("Your Vote Has Been Submitted")
                return;
            }
            if(User){
                VotesApi.sendVote(User.uid, id, User.email, gender)
                setSelected(null)
            }
    }

    return <>
    <motion.div {...Backdrop} className="ModalWrapper" onClick={() => setSelected(null)}>
        <motion.div {...SelectedBlogAnimation} layoutId={Selected.id} className="CandidatePreview" onClick={e => e.stopPropagation()}>
            <div className="head"></div>
            <div className="info">
                <motion.div className="image" layoutId={Selected.id + "image"}>
                    <Image src={!!Selected.image ? Selected.image : DEFAULT_AVATAR} fill alt="" sizes="50px" />
                </motion.div>
                <div className="identity-wrap">
                    <motion.div layout="position" className="name" layoutId={Selected.id + "name"}>{Selected.name}</motion.div>
                    <motion.div className="seatNo" layout="position" layoutId={Selected.id + "" + Selected.seatNo}>Seat No: {Selected.seatNo}</motion.div>
                </div>
            </div>
            <div className="votes">Votes: {GetVotes(Selected.id)}</div>
            <div className="content">
                <motion.div layout="position" className="desc" layoutId={Selected.id + "desc"}>{Selected.description}</motion.div>
            </div>
            <div className="Vote">
                <GlobalLightButton Content={isSubmitted(Selected.gender) ? "You Submitted Vote" : "Vote Now"} onClick={SendVote}/>
            </div>
        </motion.div>
    </motion.div>
    </>
}

const LoadingComp = () => {
    return <div className="LoadingComp">
        Loading Candidates...
    </div>
}

export default Home;

const Colors = [
    "#34568B",
    "#FF6F61",
    "#6B5B95",
    "#88B04B",
    "#F7CAC9",
    "#92A8D1",
];


const SelectedBlogVar = { 
    hidden: {
        transition: {
            duration: .05,
        }
    },
    show: {
        transition: {
            duration: .05,
        }
    }
  }
  
  const SelectedBlogAnimation = {
    variants: SelectedBlogVar,
    initial: "hidden",
    animate: "show",
    exit: "hidden"
  }

  const Backdrop = {
        variants: {
            hidden: {opacity: 0},
            show: {opacity: 1},
        },
        initial: "hidden",
        animate: "show",
        exit: "hidden",
  }