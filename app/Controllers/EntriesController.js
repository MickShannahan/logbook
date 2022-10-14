import { appState } from "../AppState.js";
import { entriesService } from "../Services/EntriesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js";


function _drawEntries() {
  let entries = appState.entries
  let template = ''
  entries.forEach(e => template += e.Template)
  setHTML('entries', template)
}

function _drawActiveEntry() {
  let entry = appState.activeEntry
  setHTML('active-entry', entry.ActiveTemplate)
  document.body.style.backgroundImage = `url(./assets/img/${entry.img}.jpg)`
  _drawLinks()
}

function _drawLinks() {
  setHTML('links', appState.activeEntry.EntryLinks)
}

export class EntriesController {
  constructor() {
    appState.on('entries', _drawEntries)
    appState.on('activeEntry', _drawEntries)
    appState.on('activeEntry', _drawActiveEntry)
    _drawEntries()
    _drawActiveEntry()
  }

  newEntry() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let entryData = getFormData(form)
      console.log(entryData)
      entriesService.newEntry(entryData)
      form.reset()
    } catch (error) {
      console.error(error)
    }
  }

  setActive(id) {
    entriesService.setActive(id)
  }

  updateEntry() {
    let input = window.event.target
    entriesService.updateEntry(input.innerText)
  }
}