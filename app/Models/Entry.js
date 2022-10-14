import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Entry {

  constructor(data) {
    this.id = data.id || generateId()
    this.title = data.title
    this.img = data.img
    this.body = data.body || ''
    this.lastModified = data.lastModified || new Date()
    this.resources = data.resources || []
  }

  get Template() {
    return `
      <p class="p-2 selectable ${this.isActive ? 'active-entry' : ''}" onclick="app.entriesController.setActive('${this.id}')">${this.title}</p>
    `
  }

  get isActive() {
    return appState.activeEntry.id == this.id
  }

  get ActiveTemplate() {
    return `
    <h3 class="col-10 text-center">${this.title}</h3>
    <div id="entry-body" class="col-10 entry-body p-2 " contenteditable onkeyup="app.entriesController.updateEntry()">${this.body}</div>
    <button class="delete-entry btn btn-outline-danger"><i class="mdi mdi-delete"></i></button>
    `
  }

  get EntryLinks() {
    let template = ''
    this.resources.forEach((r, i) => template += `
    <div class="col-10 mt-1">
      <a target="_blank" href="${r.url}">${r.name}</a>
    </div>
    <div class="col-2 text-danger selectable mt-1" onclick="app.linksController.deleteLink(${i})"><i class="mdi mdi-close"></i></div>
    `)
    return template
  }

}