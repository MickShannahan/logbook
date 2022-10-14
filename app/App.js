import { EntriesController } from "./Controllers/EntriesController.js";
import { LinksController } from "./Controllers/LinksController.js";

class App {
  entriesController = new EntriesController()

  linksController = new LinksController()
}

window["app"] = new App();
