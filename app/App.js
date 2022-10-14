import { EntriesController } from "./Controllers/EntriesController.js";

class App {
  entriesController = new EntriesController()
}

window["app"] = new App();
