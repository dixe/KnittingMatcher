import * as wasm from './wasm_knitting_matcher_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
* @param {number} top_loops
* @param {number} bottom_loops
* @returns {Pattern}
*/
export function get_pattern(top_loops, bottom_loops) {
    var ret = wasm.get_pattern(top_loops, bottom_loops);
    return Pattern.__wrap(ret);
}

/**
*/
export class Mapping {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mapping_free(ptr);
    }
}
/**
*/
export class Pattern {

    static __wrap(ptr) {
        const obj = Object.create(Pattern.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pattern_free(ptr);
    }
    /**
    */
    get top_loops() {
        var ret = wasm.__wbg_get_pattern_top_loops(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set top_loops(arg0) {
        wasm.__wbg_set_pattern_top_loops(this.ptr, arg0);
    }
    /**
    */
    get bottom_loops() {
        var ret = wasm.__wbg_get_pattern_bottom_loops(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set bottom_loops(arg0) {
        wasm.__wbg_set_pattern_bottom_loops(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    mappings() {
        var ret = wasm.pattern_mappings(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    mappings_count() {
        var ret = wasm.pattern_mappings_count(this.ptr);
        return ret >>> 0;
    }
}

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

