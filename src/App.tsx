import { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');

  const value: string = 'Vite + React';

  const clickHandler = (): void =>
    !title ? setTitle(value) : setTitle('null');

  return (
    <>
      <h1>{title}</h1>
      <button onClick={clickHandler}>Get Title</button>
    </>
  );
}

export default App;
