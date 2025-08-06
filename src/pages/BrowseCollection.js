import React from 'react';
import './BrowseCollection.css';
import { Link } from 'react-router-dom';

const books = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    image: 'https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg',
  },
  {
    id: 2,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    image: 'https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg',
  },
  {
    id: 3,
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg',
  },
  {
    id: 4,
    title: 'Ikigai',
    author: 'Héctor García',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81s6DUyQCZL.jpg',
  },
];

function BrowseCollection() {
  return (
    <div className="collection-container">
      <h2>Browse Collection</h2>
      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>By {book.author}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}

export default BrowseCollection;
