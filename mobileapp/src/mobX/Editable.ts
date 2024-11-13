// Editable.ts (MobX store)
import { makeAutoObservable } from "mobx";

class Editable {
  value = false; // За замовчуванням редагування вимкнене

  constructor() {
    makeAutoObservable(this);
  }

  setValue(newValue: boolean) {
    this.value = newValue;
  }
}

const editable = new Editable();
export default editable;
