import { useState, useEffect } from 'react';
import './index.css';
import Block from './components/Block';

const App = () => {
  const [numBlocks, setNumBlocks] = useState(0);
  const [combination, setCombination] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [blockFlash, setBlockFlash] = useState('');
  const [playerTurn, setPlayerTurn] = useState(false);
  const [start, setStart] = useState(false);
  const [countClicks, setCountClicks] = useState(0);

  const createBlocks = () => {
    let blocksCreated = [];
    for(let i=0; i < numBlocks; i++) {
      blocksCreated.push({id: 'b'+i})
    }
    setBlocks(blocksCreated);
    registerTurn();
    setStart(true);
  }

  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const registerTurn = () => {
    const randomBlock = Math.floor(Math.random() * blocks.length);
    setCombination([...combination, { position: 'b'+randomBlock}])
    displayBlocks();
  }

   const displayBlocks = async() => {
    await timeout(1000);
    for (let i = 0; i < combination.length; i++) {
      setBlockFlash(combination[i].position);
      console.log(combination[i].position)
      await timeout(1000);
      setBlockFlash("");
      await timeout(1000);
    }
    setPlayerTurn(true);
  }

  const handlePush = (e) => {
    console.log(countClicks, combination.length, combination)
    const blockPushed = e.target.id;
    if (combination[countClicks].position === blockPushed) {
      setCountClicks(countClicks + 1);
    } else {
      setStart(false);
      setCountClicks(0);
      setCombination([]);
    }
    if (countClicks + 1 === combination.length) {
      console.log('FINISH');
      setPlayerTurn(false);
      setCountClicks(0);
      registerTurn();
    }
  }
 
  useEffect(() => {
    if (!playerTurn && start) 
      displayBlocks()
  }, [playerTurn, start])

  return (
    <div id="app">
      <div id="header">
        <h1>Bienvenido al juego de memoria Simon.</h1>
        <h3>Para comenzar, ¿con cuantos bloques quieres jugar?</h3>
        <div id="inputs-start">
          <input type="number" onChange={(e) => setNumBlocks(e.target.value)}/>
          <button id="btn-start" onClick={() => createBlocks()}>Comenzar</button>
        </div>
      </div>
      <div id="game">
        <div id="blocks">
          {blocks.map((block) => <Block key={block.id} onClick={handlePush} id={block.id} flash={block.id === blockFlash}/>)}
        </div>
        <div id="turn">
          {start &&
            <h1>{playerTurn ? 'Es tu turno' : 'Es el turno de simón, atento a la combinación'}</h1>
          }
        </div>
      </div>
      <button onClick={() => registerTurn()}>Test</button>
    </div>
  )
}

export default App;