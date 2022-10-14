import { appState } from "../AppState.js"
import { saveState } from "../Utils/Store.js"


class LinksService {
  newLink(linkData) {
    let link = linkData
    let entry = appState.activeEntry
    entry.resources.push(link)
    console.log(entry)
    appState.activeEntry = entry
    // NOTE this is weird
    saveState('activeEntry', entry)
    saveState('entries', appState.entries)
  }

  deleteLink(index) {
    appState.activeEntry.resources.splice(index, 1)
    saveState('activeEntry', appState.activeEntry)
  }
}

export const linksService = new LinksService()