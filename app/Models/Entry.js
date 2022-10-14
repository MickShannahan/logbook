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
    this.title = data.title
    this.img = data.img
    this.body = data.body || ''
    this.lastModified = data.lastModified || new Date()
    this.resources = []
  }

}