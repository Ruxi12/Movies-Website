import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ajustați calea către locația reală a AuthContext
import './HomePage.css';
const HomePage = () => {
  const { currentUser } = useAuth(); // Folosiți useAuth pentru a accesa currentUser
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (currentUser) {
      navigate('/dashboard'); // Redirecționați către Dashboard dacă utilizatorul este logat
    } else {
      navigate('/login'); // Altfel, redirecționați către pagina de login
    }
  };

  return (
    <div>
      <h1>Bine ai venit în lumea magică a filmelor!</h1>
      <p>Explorarea nu a fost niciodată mai captivantă. Alege-ți următoarea aventură, scufundă-te în povești inedite și trăiește fiecare emoție la intensitate maximă.</p>
      <button className="button" onClick={handleExploreClick}>Explorează acum</button>
    </div>
  );
};

export default HomePage;

