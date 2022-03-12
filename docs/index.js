import init from "./rust_knitting_matcher.js";
import { get_pattern } from "./rust_knitting_matcher.js";


// Run init from wasm to compile the wasm
init().then(w => run(w));

// Set the wasm fufilled promise to wasm, to access buffer
var wasm = null;
function run(w) {
    wasm = w;
}

const calcButton = document.getElementById("calc");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const numbers_pattern = document.getElementById("numbers_pattern");

calcButton.addEventListener("click", event => {
    var top =  parseInt(document.getElementById("top").value);
    var bottom = parseInt(document.getElementById("bottom").value);


    var pattern = get_pattern(top, bottom)


    const mappings_ptr = pattern.mappings();
    // Mappings is 2 32 bit uint, so count is mappngs * 2
    const count =  pattern.mappings_count() * 2;
    const pattern_mappings = new Uint32Array(wasm.memory.buffer, mappings_ptr, count);

    // increment by 2 to loop over number of mappings
    let mappings = []
    for (let i = 0; i < count; i += 2) {
        mappings.push({top: pattern_mappings[i], bottom: pattern_mappings[i+1]});
    }

    draw(mappings, top, bottom);

    var cur = -1;
    var singles = 1;
    var out = [];

    for (let i = 0; i < mappings.length; i++) {
        var mapping = mappings[i];

        if(mapping.bottom === cur) {
            out.push(singles - 1);
            singles = 0;
        }

        singles += 1;
        cur = mapping.bottom;
    }
    numbers_pattern.innerText = out;

});


function was_pattern(top, bottom) {
    var pattern = wasm.get_pattern(top, bottom)

    console.log(pattern);
    const mappings_ptr = pattern.mappings();
    // Mappings is 2 32 bit uint, so count is mappngs * 2
    const count =  pattern.mappings_count() * 2;
    const pattern_mappings = new Uint32Array(memory.buffer, mappings_ptr, count);

    // increment by 2 to loop over number of mappings
    let mappings = []
    for (let i = 0; i < count; i += 2) {
        mappings.push({top: pattern_mappings[i], bottom: pattern_mappings[i+1]});
    }

    return mappings;xb
}

const COLOR = "#CCCCCC";

const draw = (mappings, top, bottom) => {

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var padding = 5;
    var top_w = (w - padding * 2)/top;

    var bot_w = (w - padding * 2)/bottom;

    var offset_top = padding ;
    var offset_bot = padding + bot_w/2;
    var d = 5;

    for(let i = 0; i< top; i++) {
        ctx.fillRect(offset_top, 20, d, d);
        offset_top += top_w;
    }

    for(let i = 0; i< bottom; i++) {
        ctx.fillRect(offset_bot, 100, d, d);
        offset_bot += bot_w;

    }

    ctx.beginPath();
    ctx.strokeStyle = COLOR;

    for (var i = 0; i < mappings.length; i++) {
        let mapping = mappings[i];
        ctx.moveTo(mapping.top * top_w + padding + d/2, 20+d/2);
        ctx.lineTo(mapping.bottom * bot_w + bot_w/2 + padding + d/2, 100+ d/2);
    }
    ctx.stroke();



};
