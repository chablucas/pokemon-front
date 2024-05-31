import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pv from'./Pv.js';
import Pv2 from'./Pv2.js';
import "./Pokemon.css";

function Poke() {
  const [apiData, setApiData] = useState(null);
  const [poke, setPoke] = useState([]);
  const [poke2, setPoke2] = useState([]);
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [nom, setNom] = useState('');
  const [nom2, setNom2] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitted2, setFormSubmitted2] = useState(false);
  const [moves, setMoves] = useState([]);
  const [elementsTableau, setElementsTableau] = useState([]);

  useEffect(() => {
    const recupererDonneesApi = async () => {
      try {
        const reponse = await axios.get('http://localhost:3001/random');
        const data = reponse.data;
        data.Moves = JSON.parse(data.Moves);
        setMoves(reponse.data.Moves);
      } catch (erreur) {
        console.error("Erreur lors de la récupération des données de l'API :", erreur);
      }
    };

    recupererDonneesApi();
  }, []);
  
  useEffect(() => {
    const nouveauTableau = [];
    moves.forEach(element => {
      const elements = element.split(','); 
      nouveauTableau.push(elements);
    });
    setElementsTableau(nouveauTableau);
  }, [moves]);
  
  const Name = (e) => {
    setNom(e.target.value);
  };

  const newName = (e) => {
    e.preventDefault();
    setFormSubmitted(true);  
  };

  const Name2 = (e) => {
    setNom2(e.target.value);
  };

  const newName2 = (e) => {
    e.preventDefault();
    setFormSubmitted2(true);  
  };

  const Change = (index) => {
    setIndex(index);
  };

  const Change2 = (index2) => {
    setIndex2(index2);
  };
  
  const Attaque = () => {
    setPoke2((prevPoke2) => [
      ...prevPoke2.slice(0, index2),
      { ...prevPoke2[index2], currentHp: prevPoke2[index2].currentHp - (((prevPoke2[index2]["Attack"] / 10) + 10)-(prevPoke2[index]["Defense"] / 10)) },
      ...prevPoke2.slice(index2 + 1),
    ]);
  };

  const SpeAtt = () => {
    setPoke2((prevPoke2) => [
      ...prevPoke2.slice(0, index2),
      { ...prevPoke2[index2], currentHp: prevPoke2[index2].currentHp - (((prevPoke2[index2]["Special Attack"] / 4)+10)-(prevPoke2[index]["Defense"] / 10)) },
      ...prevPoke2.slice(index2 + 1),

    ]);
  };

  const Attaque2 = () => {
    setPoke((prevPoke) => [
      ...prevPoke.slice(0, index),
      { ...prevPoke[index], currentHp: prevPoke[index].currentHp - (((prevPoke[index]["Attack"] / 10) + 10)-(prevPoke[index2]["Defense"] / 10)) },
      ...prevPoke.slice(index + 1),
    ]);
  };

  const SpeAtt2 = () => {
    setPoke((prevPoke) => [
      ...prevPoke.slice(0, index),
      { ...prevPoke[index], currentHp: prevPoke[index].currentHp - (((prevPoke[index]["Special Attack"] / 4)+10)-(prevPoke[index2]["Defense"] / 10)) },
      ...prevPoke.slice(index + 1),
    ]);
  };

  const PokeUp = () => {
    if (apiData) {
        if (poke.length < 6) 
          setPoke((prevPoke) => [...prevPoke, apiData]);
        }  
    };

    const PokeUp2 = () => {
        if (apiData) {
            if (poke2.length < 6)
                setPoke2((prevPoke2) => [...prevPoke2, apiData]);
          }  
        };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/random');
        const pokemonData = response.data
        pokemonData.currentHp = pokemonData["HP"];
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [poke, poke2]);

  useEffect(() => {
    setPoke((prevPoke) => prevPoke.filter((p) => p.currentHp > 0));
    setPoke2((prevPoke2) => prevPoke2.filter((p) => p.currentHp > 0));
  }, [poke, poke2]);

  return (
    <div className="combat">
      <div className="team">
      {formSubmitted ? (
          <>{nom && <h1>{nom}</h1>}</>
        ) : (
          <form onSubmit={newName}>
            <label>
              <strong>Nom du joueur :</strong><br/>
              <input type="text" value={nom} onChange={Name} />
            </label>
            <button type="submit">Valider</button>
          </form>
        )}
        <button onClick={PokeUp}>Ajouter un Pokémon</button>
        {poke.map((poke, index) => (
          <p key={index} ><button key={poke.index} onClick={() => Change(index)}><strong>{poke[" Name"]}</strong></button><br/>HP {poke["currentHp"]} - Att {poke["Attack"]} - Def {poke["Defense"]}</p>
          ))}
        {poke.length > 0 && (
          <>
            <p><strong>{poke[index][" Name"]}</strong>- currentHP {poke[index]["currentHp"]} / HP {poke[index]["HP"]}</p>
            <Pv currentHp={poke[index]["currentHp"]} maxHp={poke[index]["HP"]}/>
            <button onClick={Attaque} able={elementsTableau.length === 0}>
            {elementsTableau.length > 0 && elementsTableau[index] && elementsTableau[index][1]}
            </button>
            <button onClick={SpeAtt}> Special Attaque</button>
          </>
        )}
        </div>
       <div className="team2">
          {formSubmitted2 ? (
              <>{nom && <h1>{nom2}</h1>}</>
            ) : (
              <form onSubmit={newName2}>
                <label>
                  <strong>Nom du joueur :</strong><br/>
                  <input type="text" value={nom2} onChange={Name2} />
                </label>
                <button type="submit">Valider</button>
              </form>
            )}
            {poke2.map((poke2, index2) => (
            <p key={index2} ><button key={poke2.index2} onClick={() => Change2(index2)}><strong>{poke2[" Name"]}</strong></button><br/>HP {poke2["currentHp"]} - Att {poke2["Attack"]} - Def {poke2["Defense"]}</p>
            ))}
            <button onClick={PokeUp2}>Ajouter un Pokémon</button>
            {poke2.length > 0 && (
            <>
            <p><strong>{poke2[index2][" Name"]}</strong>- currentHP {poke2[index2]["currentHp"]} / HP {poke2[index2]["HP"]}</p>
            <Pv2 currentHp={poke2[index2]["currentHp"]} maxHp={poke2[index2]["HP"]}/>
            <button onClick={Attaque2}>Attaque</button>
            <button onClick={SpeAtt2}> Special Attaque</button>
            </>
            )}
          </div>
    </div>
  );
}

export default Poke;