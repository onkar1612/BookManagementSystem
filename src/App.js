import React, { useEffect, useState } from 'react';
import Book from './components/Book';
import AddBook from './components/AddBook';
import useFetch from './useFetch';
import Navbar from './components/Navbar';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import About from './components/contactUs';



function App() {


    let { data, error } = useFetch('http://localhost:8000/books');

    let [books, setBooks] = useState(null);

    useEffect(()=>{
        setBooks(data);
    }, [data]);



    function handleRemove(id) {
        fetch(`http://localhost:8000/books/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                let newBooks = books.filter(
                    (element) => {
                        return element.id !== id;
                    }
                )
                setBooks(newBooks);
            })
            .catch(error => {
                console.error('Error removing book:', error);
            });
    }

    function handleSubmit(book) {
        fetch('http://localhost:8000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
            .then(() => {
                let newBooks = [...books];
                newBooks.push(book);
                setBooks(newBooks);
            })
            .catch(error => {
                console.error('Error adding book:', error);
            });
    }

    return (
        <div id="main-container">
            <Navbar></Navbar>

            <Routes>
                <Route path="/" element={<AddBook handleSubmit={handleSubmit}> </AddBook>}></Route>

                <Route path="/About" element={<About></About>}/>
            </Routes>

            
            {
                !error ? books &&
                    books.map(
                        (element) => {
                            return <Book
                                key={element.id}
                                id={element.id}
                                title={element.title}
                                author={element.author}
                                price={element.price}
                                handleRemove={handleRemove}
                                books={books}
                                setBooks={setBooks}
                            >
                            </Book>
                        }
                    )
                    :
                    error
            }
        </div>
    );
}

export default App;
