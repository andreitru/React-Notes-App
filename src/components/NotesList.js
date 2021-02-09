import React from "react";
import { formatDistance, subDays } from 'date-fns';
import {ru} from 'date-fns/locale';
import firebase from "firebase";

function NotesList({note, notes, setNotes, user}) {

  const removeNote = (id) => {
    const newState = notes.filter(note => note.id !== id)
    setNotes(newState)
    const remove = {};
    remove[user + '/' + id] = null;
    return firebase.database().ref().update(remove);
  }

  return (
    <div className='col-4 p-2 mb-3 pb-4 border d-flex justify-content-between align-items-start note position-relative'>
      <div className='note-text'>
        <span className='d-block fs-4'>{note.title}</span>
        <p className='text-break'>{note.text}</p>
      </div>
      <button
        className='btn btn-danger'
        onClick={() => removeNote(note.id)}
      >&times;
      </button>
      <span className='date'>{formatDistance(subDays(note.date, 0), Date.now(), {locale: ru})} назад</span>
    </div>
  );
}

export default NotesList;