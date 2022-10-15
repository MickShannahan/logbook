import { appState } from "../AppState.js"
import { Entry } from "../Models/Entry.js"
import { saveState } from "../Utils/Store.js"


class EntriesService {
  swapTheme() {
    let entry = appState.activeEntry
    if (entry.theme == 'dark') {
      entry.theme = 'light'
    } else {
      entry.theme = 'dark'
    }
    this.updateEntry(entry.body)
  }
  deleteEntry(id) {
    appState.activeEntry = null
    appState.entries = appState.entries.filter(e => e.id != id)
    saveState('entries', appState.entries)
    saveState('activeEntry', null)
  }
  updateEntry(newBody) {
    // update active
    const entry = appState.activeEntry
    entry.body = newBody
    entry.lastModified = new Date()
    appState.emit('activeEntry')
    saveState('activeEntry', appState.activeEntry)
    // update list one
    let listEntry = appState.entries.find(e => e.id == appState.activeEntry.id)
    listEntry = entry
    appState.emit('entries')
    saveState('entries', appState.entries)
  }
  setActive(id) {
    const entry = appState.entries.find(e => e.id == id)
    appState.activeEntry = entry
    saveState('activeEntry', entry)
  }

  newEntry(entryData) {
    const entry = new Entry(entryData)
    appState.entries = [...appState.entries, entry]
    appState.activeEntry = entry
    saveState('entries', appState.entries)
  }

}

export const entriesService = new EntriesService()