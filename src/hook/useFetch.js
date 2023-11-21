import { useEffect, useState } from "react";
import axios from "axios";


const hostServer = import.meta.env.VITE_REACT_APP_SERVER_URL;

const useFetch = () => {
    const [loader, setLoader] = useState(false);
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        setLoader(true);
        axios.get(`${hostServer}/api/quiz`)
            .then(async (res) => {
                const data = await res.data;
                setQuiz(data);
                setLoader(false);
            });
    }, []);

    return { loader, quiz };
};

export default useFetch;

