import React, {useEffect} from 'react';
import '../styles.css';
import Header from "./header";
import Meme from "./meme";
import favicon from "../assets/troll.ico";

const App = () => {
    useEffect(()=>{
        document.getElementById("favicon").href = favicon;
    }, [])
    return(
        <>
            <Header/>
            <Meme/>
        </>
    )
}

export default App;
