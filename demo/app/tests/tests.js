var NoiceImagePicker = require("nativescript-noice-image-picker").NoiceImagePicker;
var noiceImagePicker = new NoiceImagePicker();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("functionname", function() {
  it("exists", function() {
    expect(noiceImagePicker.functionname).toBeDefined();
  });

  it("returns a promise", function() {
    expect(noiceImagePicker.functionname()).toEqual(jasmine.any(Promise));
  });
});