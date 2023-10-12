import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map(function(note, index) {
        let summary = note.body
        let [title] = summary.split("\n")
        console.log(typeof(note.body))
        return (
            <div key={note.id}>
                <div 
                    className={`title ${
                        note.id === props.currentNote.id ? "selected-note" : ""
                    }`}
                    onClick={function() {
                        return props.setCurrentNoteId(note.id)
                    }}
                >
                    <h4 className="text-snippet">{title}</h4>
                </div>
            </div>
        )
    })

    

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>

    )
}