import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Entry {

  constructor(data) {
    this.id = data.id || generateId()
    this.title = data.title
    this.theme = data.theme || 'light'
    this.img = data.img
    this.body = data.body || ''
    this.lastModified = new Date(data.lastModified) || new Date()
    this.resources = data.resources || []
  }
  // Computed
  get isActive() {
    if (appState.activeEntry) {
      return appState.activeEntry.id == this.id
    }
  }

  get Time() {
    return this.lastModified.getHours() + ':' + this.lastModified.getMinutes()
  }

  get TimeAgo() {
    let milli = this.lastModified.getTime()
    let now = new Date().getTime()
    let seconds = Math.floor((now - milli) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " m ago";
    }
    interval = seconds / 29;
    if (interval > 1) {
      return "less a minute ago";
    }
    return Math.floor(seconds) + " s ago";
  }


  // Templates
  get Template() {
    return `
      <p class="p-2 selectable entry d-flex justify-content-between ${this.isActive ? 'active-entry' : ''}" onclick="app.entriesController.setActive('${this.id}')">
      ${this.title}<span class="text-dark fancy-font lighten-30">${this.Time}<span>
      </p>
    `
  }


  get ActiveTemplate() {
    return `
    <h3 class="col-10 text-center text-${this.theme}">${this.title}</h3>
    <div id="entry-body" class="col-10 entry-body p-2 text-${this.theme}" contenteditable onblur="app.entriesController.updateEntry()">${this.body}</div>
    <div class="btn btn-outline-${this.theme} theme-button" onclick="app.entriesController.swapTheme()"><i class="mdi mdi-lightbulb"></i></div>
    <button class="delete-entry btn btn-outline-danger" onclick="app.entriesController.deleteEntry('${this.id}')"><i class="mdi mdi-delete"></i></button>
    <small id="save-timer" class="col-10 text-primary text-end">saved ${this.TimeAgo}</small>
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