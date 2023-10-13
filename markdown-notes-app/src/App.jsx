import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import './App.css';
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { notesCollection, db } from "./firebase/firebase"

export default function App() {    
    const [notes, setNotes] = React.useState(
      () => JSON.parse(localStorage.getItem("notes")) || [])

    React.useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const [currentNoteId, setCurrentNoteId] = React.useState("")
    console.log(currentNoteId)
    const currentNote = 
      notes.find(note => note.id === currentNoteId) 
      || notes[0]

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])

    

    // function createNewNote() {
    //   const newNote = {
    //     id: nanoid(),
    //     body: "# Type your markdown note's title here"
    //   }
    //   setNotes(function(prevNotes) {
    //     return (
    //       [
    //         newNote,
    //         ...prevNotes
    //       ]        
    //     )
    //   })
    //   setCurrentNoteId(newNote.id)
    // }

    React.useEffect(() => {
      if (!currentNoteId) {
          setCurrentNoteId(notes[0]?.id)
      }
    }, [notes])

    async function createNewNote() {
      const newNote = {
          body: "# Type your markdown note's title here"
      }
      const newNoteRef = await addDoc(notesCollection, newNote)
      setCurrentNoteId(newNoteRef.id)
    }

    // function updateNote(text) {
    //   // Put the most recently-modified note at the top
    //   //const currentNote = findCurrentNote()
    //   const noteIndex = notes.findIndex(function(note) {
    //     return note.id === currentNoteId
    //   })

    //   if (noteIndex !== -1) {
    //     // Remove note from its current position
    //     const updateNotes = [
    //       ...notes.slice(0, noteIndex),
    //       ...notes.slice(noteIndex + 1)
    //     ]

    //     //Add the note to the begining of the array
    //     setNotes([
    //       currentNote,
    //       ...updateNotes
    //     ])

    //     currentNote.body = text

    //   }
    //     // setNotes(oldNotes => {
    //     //   const newArray = []
    //     //   for(let i = 0; i < oldNotes.length; i++) {
    //     //       const oldNote = oldNotes[i]
    //     //       if(oldNote.id === currentNoteId) {
    //     //           newArray.unshift({ ...oldNote, body: text })
    //     //       } else {
    //     //           newArray.push(oldNote)
    //     //       }
    //     //   }
    //     //   return newArray
    //     // })
    // }

    async function deleteNote(noteId) {
      const docRef = doc(db, "notes", noteId)
      await deleteDoc(docRef)
    }

    async function updateNote(text) {
      const docRef = doc(db, "notes", currentNoteId)
      await setDoc(docRef, {body: text}, {merge: true})
    } 
    

    // function findCurrentNote() {
    //   return notes.find(function(note) {
    //     return note.id === currentNoteId
    //   }) || notes[0]
    // }

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
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            <Editor
              currentNote={currentNote} 
              updateNote={updateNote}
            />
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