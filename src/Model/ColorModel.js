class Color {
    constructor(red, green, blue) {
        this.Red = red === undefined? -1 : red;
        this.Green = green === undefined? -1: green;
        this.Blue = blue === undefined? -1: blue;
    }
}
module.exports = {Color}