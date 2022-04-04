export default class Tile {
    // constructor with ternary operator
    // give value 2 half of the time 
    // and give value 4 the other half of the time
    #tileElement
    #x
    #y
    #value

    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4) {
        this.#tileElement = document.createElement("div")
        this.#tileElement.classList.add("tile")
        tileContainer.append(this.#tileElement)
        this.value = value
    }

    // setter functions to set colour intensity based on how big the number is 
    // using Math.log2 (power increase by 1 as 2 become 4 become 8)
    // set the value to textContent to show the actual value
    set value(val) {
        this.#value = val
        this.#tileElement.textContent = val
        const power = Math.log2(val)
        const backgroundLightness = 100 - power * 9
        this.#tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`)
        // if background lightness is small, make text colour intensity high else low
        this.#tileElement.style.setProperty("--text-lightness", `${backgroundLightness < 50 ? 90 : 10}%`)
    }

    // set css var values to this new x & y values 
    // so as to position it at the correct location
    set x(value) {
        this.#x = value
        this.#tileElement.style.setProperty("--x", value)
    }

    set y(value) {
        this.#y = value
        this.#tileElement.style.setProperty("--y", value)
    }
}