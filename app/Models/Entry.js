import { generateId } from "../Utils/generateId.js"

class link {
  constructor(data) {
    this.name = data.name
    this.link = data.link
  }
  get Template() {
    return `<a target="_blank" href="${this.link}">${this.name}</a>`
  }
}

export class Entry {

  constructor(data) {
    this.id = data.id || generateId()
    this.title = data.title
    this.img = data.img
    this.body = data.body || ''
    this.lastModified = data.lastModified || new Date()
    this.resources = []
  }

  get Template() {
    return `
      <p onclick="app.entriesController.setActive('${this.id}')">${this.title}</p>
    `
  }

  get ActiveTemplate() {
    return `
    <h3 class="col-10 text-center">${this.title}</h3>
    <textarea class="col-10 entry-body" name="">${this.body}</textarea>
    `
  }

}