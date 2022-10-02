import Image from "next/future/image";
import Head from "next/head";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import FadePageWrapper from "../Components/FadePageWrapper";
import { useState } from "react";
import { GlobalLightButton } from "Components/GlobalButtons";
import { VotesActions } from "Redux/VotesSlice";
import VotesApi from "APIs/VotesApi";
import { ErrorToast } from "Components/HSToast";

const Home = () => {
    const Candidates = useSelector((s) => s.Candidate.Candidates);
    const [Selected, setSelected] = useState(null)
    return (
        <FadePageWrapper>
            <motion.div layout className="Home" onClick={(e) => {
                setSelected(null)
            }}>
                <Head>
                    <title>Home</title>
                </Head>
                <motion.div layout className="Candidates">
                    {Candidates ?
                        Candidates.map((x, j) => (
                            <motion.div className="candidate" layout key={x.id} layoutId={x.id} onClick={(e) => {
                                e.stopPropagation()
                                setSelected(x)
                            }}> 
                                <div
                                    className="overlay"
                                    style={{
                                        backgroundColor: Colors[j],
                                    }}
                                />
                                <motion.div className="seatNo" layout="position" layoutId={x.id + "" + x.seatNo}>Seat No: {x.seatNo}</motion.div>
                                <motion.div className="image" layoutId={x.id + "image"}>
                                    <Image src={x.image} fill alt="" sizes="50px" />
                                </motion.div>
                                <div className="info">
                                    <motion.div layout="position" className="name" layoutId={x.id + "name"}>{x.name}</motion.div>
                                    <motion.div layout="position" className="desc" layoutId={x.id + "desc"}>{x.description}</motion.div>
                                </div>
                            </motion.div>
                        )) : <LoadingComp />}
                </motion.div>
                <AnimatePresence>
                    {Selected && <CandidatePreview Selected={Selected} setSelected={setSelected}/>}
                </AnimatePresence>
            </motion.div>
        </FadePageWrapper>
    );
};

const CandidatePreview = ({ Selected, setSelected }) => {

    const { User, isVoteSubmitted } = useSelector((s) => s.CurrentAuth);

    const Votes = useSelector((s) => s.Votes.AllVotes);

    const GetVotes = (id) => {
        return (Votes.filter(x => x.to === id)).length
    }

    const SendVote = () => {
        if(isVoteSubmitted) {
            ErrorToast("Your Vote Has Been Submitted")
            return;
        }
        if(User){
            VotesApi.sendVote(User.uid, Selected.id, User.email)
        }
    }

    return <motion.div {...Backdrop} className="ModalWrapper" onClick={() => setSelected(null)}>
        <motion.div {...SelectedBlogAnimation} layoutId={Selected.id} className="CandidatePreview" onClick={e => e.stopPropagation()}>
            <div className="head"></div>
            <div className="info">
                <motion.div className="image" layoutId={Selected.id + "image"}>
                    <Image src={Selected.image} fill alt="" sizes="50px" />
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
                <GlobalLightButton Content={isVoteSubmitted ? "You Submitted Vote" : "Vote Now"} onClick={SendVote}/>
            </div>
        </motion.div>
    </motion.div>
}

const LoadingComp = () => {
    return <div className="LoadingComp">
        Loading Candidates...
    </div>
}

export default Home;

const randomIntFromInterval = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

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