
let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

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

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('rust_knitting_matcher_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

