import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Editor({tempNoteText, setTempNoteText}) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const convertor = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    })

    return (
        <section className="pane editor"> 
            <ReactMde
                value={tempNoteText}
                onChange={setTempNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={function(markdown) {
                    return Promise.resolve(convertor.makeHtml(markdown))
                }}
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}