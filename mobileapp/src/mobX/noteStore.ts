import { makeAutoObservable } from "mobx";

class NoteStore {
  text = "";

  constructor() {
    makeAutoObservable(this);
  }

  setText(newText: string) {
    this.text = newText;
  }
}

const noteStore = new NoteStore();
export default noteStore;
