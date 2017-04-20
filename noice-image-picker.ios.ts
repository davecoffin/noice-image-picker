import { Common } from "./noice-image-picker.common";
import * as frame from "ui/frame";

// making sure these are retained
let _imagePickerController: ImagePickerController = null;
let _imagePickerDelegateImpl: ImagePickerDelegateImpl = null;

export class NoiceImagePicker extends Common {

  public showPicker() {
    _imagePickerController = ImagePickerController.new();

    // you can pass these in as options
    let imageLimit: number = 5;
    let doneButtonTitle: string = "OK!";

    _imagePickerController.imageLimit = imageLimit;
    _imagePickerController.doneButtonTitle = doneButtonTitle;

    let vc: UIViewController = null;

    _imagePickerController.delegate = _imagePickerDelegateImpl = ImagePickerDelegateImpl.new().initWithCallback((images?: NSArray<UIImage>) => {
      console.log("************ native images: " + images);
      console.log("************ nr of images: " + (images ? images.count : null));
      vc.dismissViewControllerAnimatedCompletion(true, null);
    });

    let topMostFrame = frame.topmost();
    if (topMostFrame) {
      vc = topMostFrame.currentPage && topMostFrame.currentPage.ios;
      if (vc) {
        vc.presentViewControllerAnimatedCompletion(_imagePickerController, true, null)
      }
    }
  }
}

class ImagePickerDelegateImpl extends NSObject implements ImagePickerDelegate {
  public static ObjCProtocols = [ImagePickerDelegate];
  static new(): ImagePickerDelegateImpl {
    return <ImagePickerDelegateImpl>super.new();
  }
  private _callback: (images?: NSArray<UIImage>) => void;

  public initWithCallback(callback: (images?: NSArray<UIImage>) => void): ImagePickerDelegateImpl {
    this._callback = callback;
    return this;
  }

  cancelButtonDidPress(imagePicker: ImagePickerController): void {
    console.log("************ delegate: cancelButtonDidPress");
    this._callback();
  }

  doneButtonDidPressImages(imagePicker: ImagePickerController, images: NSArray<UIImage>): void {
    console.log("************ delegate: doneButtonDidPressImages");
    this._callback(images);
  }

  wrapperDidPressImages(imagePicker: ImagePickerController, images: NSArray<UIImage>): void {
    console.log("************ delegate: wrapperDidPressImages");
    this._callback(images);
  }
}