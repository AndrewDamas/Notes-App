const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => note.title === title);
    const noteIndex = notes.findIndex(note => note.title === title);
    if (duplicateNotes.length === 1) {
        notes.splice(noteIndex, 1);
        saveNotes(notes);
        console.log(chalk.bgGreen('Note with title "' + title + '" deleted.'))
    } else {
        console.log(chalk.bgRed('No note with title "' + title + '" found.'))
    }
}

const listNotes = () => {
    console.log(chalk.inverse.bold('LIST OF NOTES'))
    loadNotes().forEach(note => console.log(note.title));
}

const readNote = (title) => {
    const theNote = loadNotes().find(note => note.title === title);
    if (theNote) {
        console.log(chalk.inverse.bold(theNote.title));
        console.log(theNote.body)
    } else {
        console.log(chalk.bgRed("NOTE NOT FOUND"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}