import { appState } from "../AppState.js";
import { entriesService } from "../Services/EntriesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawEntries() {
  let entries = appState.entries
  let template = ''
  entries.forEach(e => template += e.Template)
  setHTML('entries', template)
}

function _drawActiveEntry() {
  let entry = appState.activeEntry
  if (entry) {
    setHTML('active-entry', entry.ActiveTemplate)
    document.body.style.backgroundImage = `url(./assets/img/${entry.img}.jpg)`
    _drawLinks()
  }
}

function _drawLinks() {
  setHTML('links', appState.activeEntry.EntryLinks)
}

function _drawSaveTimer() {
  setHTML('save-timer', 'saved ' + appState.activeEntry.TimeAgo)
}



export class EntriesController {
  constructor() {
    appState.on('entries', _drawEntries)
    appState.on('activeEntry', _drawEntries)
    appState.on('activeEntry', _drawActiveEntry)
    _drawEntries()
    _drawActiveEntry()
    setInterval(this.saveEntry, 30000)
    setInterval(_drawSaveTimer, 1000)
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

  async deleteEntry(id) {
    try {
      if (await Pop.confirm('delete these notes?')) {
        entriesService.deleteEntry(id)
      }
    } catch (error) {
      console.error(error)

    }
  }

  saveEntry() {
    let body = document.getElementById('entry-body')
    if (body) {
      entriesService.updateEntry(body.innerText)
    }
  }

  swapTheme() {
    entriesService.swapTheme()
  }
}