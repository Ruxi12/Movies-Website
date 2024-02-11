import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Button from './UI/Button';
import './FormStyles.css';

const EditFilm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchFilmData = async () => {
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setDescription(data.description);
        setRating(data.rating);
        setCategory(data.category);
      } else {
        console.log("No such document!");
      }
    };

    fetchFilmData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "movies", id), {
      title,
      description,
      rating: Number(rating),
      category,
    });

    alert('Film actualizat cu succes!');
    navigate('/dashboard');
  };

  return (
    <div className="add-film-container">
      <h2>Editează filmul</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titlu</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Descriere</label>
          <textarea
            className="form-input description-input-large"
            style={{ fontSize: '16px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            className="form-input"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Categorie</label>
          <input
            type="text"
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <Button type="submit">Actualizează Filmul</Button>
      </form>
    </div>
  );
};

export default EditFilm;
