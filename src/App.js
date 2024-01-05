import React, { useState } from 'react';
import './App.css';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [showAllMoves, setShowAllMoves] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      
      if (!response.ok) {
        throw new Error(`Pokémon não encontrado: ${pokemonName}`);
      }

      const data = await response.json();

      // Atualize o estado com as informações obtidas
      setPokemonData(data);
      setError(null);
      setShowAllMoves(false); // Reseta o estado para mostrar apenas os três primeiros movimentos.
    } catch (error) {
      console.error('Erro ao buscar informações do Pokémon', error.message);
      setPokemonData(null);
      setError(`Não foi possível encontrar o Pokémon: ${pokemonName}`);
    }
  };

  const handleToggleMoves = () => {
    setShowAllMoves(!showAllMoves);
  };

  return (
    <div className="App">
      <h1>App de Busca Pokémon</h1>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Digite o nome do Pokémon"
      />
      <button className="toggle-button" onClick={handleSearch}>Pesquisar</button>

      {error && <p className="error-message">{error}</p>}

      {pokemonData && (
        <div className="Pokemon-info">
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <div className="data-section">
            <p className="data-label"><strong>Experiência base:</strong></p>
            <p>{pokemonData.base_experience}</p>
          </div>
          <div className="data-section">
            <p className="data-label"><strong>Movimentos:</strong></p>
            <p>{showAllMoves ? (
              pokemonData.moves.map((move) => move.move.name).join(', ')
            ) : (
              pokemonData.moves.slice(0, 3).map((move) => move.move.name).join(', ')
            )}
            </p>
            <p className="toggle-link" onClick={handleToggleMoves}>
              {showAllMoves ? 'Mostrar Menos' : 'Mostrar Todos'}
            </p>
          </div>
          <div className="data-section">
            <p className="data-label"><strong>Peso:</strong></p>
            <p>{pokemonData.weight / 10} kg</p>
          </div>
          <div className="data-section">
            <p className="data-label"><strong>Altura:</strong></p>
            <p>{pokemonData.height / 10} metros</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
