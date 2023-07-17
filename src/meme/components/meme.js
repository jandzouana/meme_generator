import React, {useState, useEffect} from 'react';
import { saveAsPng, saveAsJpeg } from 'save-html-as-image-enhanced';

const Meme = () => {
    const [meme, setMeme] = useState({
        randomImage: '',
        topText: "",
        bottomText: ""
    });

    const [memeData, setMemeData] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                console.log("Data: ", data);
                setMemeData(data.data.memes);
                //console.log(memeData);
            })
            .catch((err) => console.log("Could not load API: " + err));
    }, [])

    //console.log("Meme data: " + memeData);

    useEffect(() => {
        if(memeData.length === 0) return;
        setRandomImage();
    }, [memeData])

    function getRandomImage(){
        // const memes = memesData.data.memes;
        const rand = Math.floor(Math.random() * memeData.length);
        return memeData[rand].url;
        //console.log("Rand: " + memes[rand].url);
    }

    function setRandomImage(){
        setMeme(meme=>({...meme, randomImage: getRandomImage()}));
    }

    function handleChange(event){
        const {name, value} = event.target;
        setMeme(meme => ({...meme, [name]:value}));
    }

    function handleSaveClick(){
        saveImage();
    }
    function saveImage(){
        const divElement = document.getElementById("meme");
        saveAsPng(divElement, { filename: 'meme', printDate: false });
    }

    return(
        <div id={"main-container"}>
            <div id={"form"}>
                <section>
                    <input type={"text"} placeholder={"Enter top text here..."} className={"form-text"} name={"topText"} onChange={handleChange} value={meme.topText}/>
                    <input type={"text"} placeholder={"Enter bottom text here..."} className={"form-text"} name={"bottomText"} onChange={handleChange} value={meme.bottomText}/>
                </section>
                <button onClick={setRandomImage} className={"white-text bold-text purple-button"}>Get a new meme image 🖼</button>
            </div>
            <button onClick={handleSaveClick} id={"save-button"} className={"white-text bold-text purple-button"}>Save meme</button>
            {/*<div id={'meme-img'} style={{backgroundImage:`url(${imgSrc})`}}></div>*/}
            <div id={"meme"}>
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
                <img src={meme.randomImage} id={"meme-img"} alt={'meme'} />
            </div>
        </div>
    )
}

export default Meme;
