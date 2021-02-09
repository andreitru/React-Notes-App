import React, {useState} from "react";
import firebase from "firebase";

function Input({notes, setNotes, user, isForm, setIsForm}) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title && !text) {
      return
    }

    const newNote = {
      id: Date.now(),
      title: title,
      text: text,
      date: Date.now(),
    }

    function writeNote(user, note) {
      const updates = {};
      updates[user + '/' + note.id + '/'] = note;

      return firebase.database().ref().update(updates);
    }

    setNotes(notes.concat(newNote))
    writeNote(user, newNote)
    setTitle('')
    setText('')
    setIsForm(false)
  }

  return (
    <div className='form-container' style={isForm ? {display: 'block'} : {display: 'none'}}>
      <form
        className='d-flex justify-content-center align-items-center flex-column col-4'
        onSubmit={handleSubmit}
      >
        <button
          className='btn btn-danger'
          onClick={() => setIsForm(false)}
        >&times;
        </button>
        <input
          type="text"
          placeholder="Введите название заметки"
          name="title"
          value={title}
          className='form-control'
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={5}
          placeholder="Введите текст заметки"
          name="text"
          value={text}
          className='form-control mt-2'
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className='btn btn-success mt-3'
          disabled={(!title && !text)}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default Input;