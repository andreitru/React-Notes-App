import './App.css';
import Input from './components/Input';
import NotesList from "./components/NotesList";
import React, {useState, useEffect} from "react";
import firebase from "firebase";
import {firebaseConfig} from "./firebase/config";
import Auth from "./components/Auth";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState('');
  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, [])

  useEffect(() => {
    if (user) {
      const database = firebase.database().ref(user + '/').once('value',
        (snapshot) => {
          const data = snapshot.val();
          setIsLoaded(true);
          if (data !== null) {
            setNotes(notes.concat(Object.values(data)))
          }
        })
    }
  }, [user])

  function List() {
    if (!user) {
      return (<div className='text'>Войдите, чтобы увидеть заметки</div>)
    } else if (!isLoaded && user) {
      return (<div className='text'>Loading...</div>)
    } else if (isLoaded && notes.length !== 0) {
      return (notes.map(note => <NotesList key={note.id} note={note} user={user} notes={notes} setNotes={setNotes}/>))
    } else if (notes.length === 0 && isLoaded) {
      return (<div className='text'>Заметок пока нет</div>)
    }
  }

  return (
    <div className='container'>
      <header className=' align-items-start position-relative'>
        <h1 className='text-center h1 mt-2'>Заметки</h1>
        <Auth user={user} setUser={setUser} setNotes={setNotes}/>
      </header>
      <main className='row align-items-start mt-5'>
        <Input setNotes={setNotes} notes={notes} user={user} isForm={isForm} setIsForm={setIsForm}/>
        {List()}
      </main>
      <section className='row'>
        <button className="btn btn-success btn-new" disabled={(!user)} onClick={() => setIsForm(true)}>Добавить заметку</button>
      </section>
    </div>
  );
}

export default App;
