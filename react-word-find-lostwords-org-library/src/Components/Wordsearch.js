import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../App.css";

function Wordsearch({
  numberWords = 1,
  lengthWords = 6,
  languageWords = "en",
} = {}) {
  const [invoke, setInvoke] = useState(Date.now());
  const [product, setProduct] = useState(null);
  const [numberOfWords, setNumberOfWords] = useState(numberWords);
  const [lengthOfWords, setLengthOfWords] = useState(lengthWords);
  const [languageOfWords, setLanguageOfWords] = useState(languageWords);

  const setInvokeClick = () => {
    setInvoke(Date.now());
  };

  const setLanguageOfWordsClick = () => {
    let languageChoices = ["en", "es", "it", "de", "zh"];
    languageChoices = languageChoices.filter((languageCode) =>
      ["en", "es", "it", "de"].includes(languageCode)
    );
    let min = 1;
    let max = languageChoices?.length;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setLanguageOfWords(languageChoices[randomNumber - 1]);
    setInvoke(Date.now());
  };

  const setLengthOfWordsClick = () => {
    let min = 3;
    let max = 8;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setLengthOfWords(randomNumber);
    setInvoke(!invoke);
  };

  const setNumberOfWordsClick = () => {
    let min = 1;
    let max = 10;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumberOfWords(randomNumber);
    setInvoke(!invoke);
  };

  useEffect(() => {
    console.log("Loading.");
    let source = Axios.CancelToken.source();
    let url = `https://random-word-api.herokuapp.com/word?number=${numberOfWords}&length=${lengthOfWords}&lang=${languageOfWords}`;

    const loadProduct = async () => {
      try {
        const response = await Axios.get(url, {
          cancelToken: source.token,
        });
        console.log(response);
        setProduct(response.data);
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log("Cancel Axios data source on error.");
        } else {
          setProduct(null); // throw error;
        }
      } finally {
        console.log("Loaded.");
      }
    };

    loadProduct();

    return () => {
      console.log("Completed.");
      source.cancel();
    };
  }, [numberOfWords, lengthOfWords, languageOfWords, invoke]);

  if (!product) {
    return <div className="App">Loading...</div>;
  }

  const mapProductWords = (theWord, index) => {
    return <h1 key={{ index }}>{theWord?.toUpperCase()}</h1>;
  };

  return (
    <div className="App">
      {product.map(mapProductWords)}
      <hr></hr>
      <button onClick={setNumberOfWordsClick}>
        Number of words [{numberOfWords}]
      </button>
      <button onClick={setLengthOfWordsClick}>
        Length of words [{lengthOfWords}]
      </button>
      <button onClick={setLanguageOfWordsClick}>
        Language of words [{languageOfWords}]
      </button>
      <hr></hr>
      <button onClick={setInvokeClick}>Invoke{invoke}</button>
    </div>
  );
}

export default Wordsearch;
