import {Observable} from 'data/observable';
import {NoiceImagePicker} from 'nativescript-noice-image-picker';

export class HelloWorldModel extends Observable {
  private noiceImagePicker: NoiceImagePicker;
  constructor() {
    super();
    this.noiceImagePicker = new NoiceImagePicker();
  }

  doSomething() {
      console.log('calling showPicker');
      this.noiceImagePicker.showPicker();
  }
}