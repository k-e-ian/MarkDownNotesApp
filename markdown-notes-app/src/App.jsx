//import logo from './logo.svg';
import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
//import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"
import './App.css';

export default function App() {    
    const [notes, setNotes] = React.useState(
      () => JSON.parse(localStorage.getItem("notes")) || [])

    React.useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    function createNewNote() {
      const newNote = {
        id: nanoid(),
        body: "# Type your markdown note's title here"
      }
      setNotes(function(prevNotes) {
        return (
          [
            newNote,
            ...prevNotes
          ]        
        )
      })
      setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
      // Put the most recently-modified note at the top
      const currentNote = findCurrentNote()
      const noteIndex = notes.findIndex(function(note) {
        return note.id === currentNoteId
      })

      if (noteIndex !== -1) {
        // Remove note from its current position
        const updateNotes = [
          ...notes.slice(0, noteIndex),
          ...notes.slice(noteIndex + 1)
        ]

        //Add the note to the begining of the array
        setNotes([
          currentNote,
          ...updateNotes
        ])

        currentNote.body = text

      }
        // setNotes(oldNotes => {
        //   const newArray = []
        //   for(let i = 0; i < oldNotes.length; i++) {
        //       const oldNote = oldNotes[i]
        //       if(oldNote.id === currentNoteId) {
        //           newArray.unshift({ ...oldNote, body: text })
        //       } else {
        //           newArray.push(oldNote)
        //       }
        //   }
        //   return newArray
        // })
    }

    function deleteNote(event, noteId) {
      event.stopPropagation()
      setNotes(function(currentNotes) {
        return currentNotes.filter(function(notes) {
          return notes.id !== noteId
        })
      })

    }

    function findCurrentNote() {
      return notes.find(function(note) {
        return note.id === currentNoteId
      }) || notes[0]
    }

    return (
      <main>
        {
          notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {
              currentNoteId && notes.length > 0 &&
              <Editor
                currentNote={findCurrentNote()} 
                updateNote={updateNote}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>you have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>
        }
      </main>
    )
}