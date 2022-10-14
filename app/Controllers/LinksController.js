import { linksService } from "../Services/LinksService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"



export class LinksController {
  constructor() {

  }

  newLink() {
    try {
      window.event.preventDefault()
      let form = window.event.target
      let linkData = getFormData(form)
      console.log(linkData)
      linksService.newLink(linkData)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteLink(index) {
    try {
      if (await Pop.confirm('delete this link?')) {
        linksService.deleteLink(index)
      }
    } catch (error) {
      console.error(error)
    }
  }
}