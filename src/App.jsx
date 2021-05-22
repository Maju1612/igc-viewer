import { useState } from 'react'

import './App.css';

import InfoPanel from './components/InfoPanel'
import SearchQuery from './components/SearchQuery'

const App = () => {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const urlRegEx = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.).*\.igc$/;

  const handleInput = e => {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleButton()
    };
  };

  const handleButton = () => {
    setError(false);
    setData(false);
    if (urlRegEx.test(inputValue)) {
      fetch(inputValue)
        .then(res => {
          if (res.ok) {
            return res;
          }
          setData(false)
          throw Error(res.status)
        })
        .then(res => res.text())
        .then(data => data.split('\n'))
        .then(data => setData(data))
        .catch(err => setError(err.toString()))
    } else {
      setError('błędny link');
    }
  }

  return (
    <>
      <SearchQuery
        handleInput={handleInput}
        handleKeyDown={handleKeyDown}
        inputValue={inputValue}
        handleButton={handleButton}
      />
      {error ? <p className='error'>Coś poszło nie tak, {error}</p> : null}
      {data && <InfoPanel data={data} />}

    </>
  );
};

export default App;
