import { appState } from "../AppState.js"
import { Entry } from "../Models/Entry.js"
import { saveState } from "../Utils/Store.js"


class EntriesService {
  setActive(id) {
    const entry = appState.entries.find(e => e.id == id)
    appState.activeEntry = entry
  }


  newEntry(entryData) {
    const entry = new Entry(entryData)
    appState.entries = [...appState.entries, entry]
    appState.activeEntry = entry
    saveState('entries', appState.entries)
  }

}

export const entriesService = new EntriesService()