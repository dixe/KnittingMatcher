/* tslint:disable */
/* eslint-disable */
/**
* @param {number} top_loops
* @param {number} bottom_loops
* @returns {Pattern}
*/
export function get_pattern(top_loops: number, bottom_loops: number): Pattern;
/**
*/
export class Mapping {
  free(): void;
}
/**
*/
export class Pattern {
  free(): void;
/**
* @returns {number}
*/
  mappings(): number;
/**
* @returns {number}
*/
  mappings_count(): number;
/**
*/
  bottom_loops: number;
/**
*/
  top_loops: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly get_pattern: (a: number, b: number) => number;
  readonly __wbg_pattern_free: (a: number) => void;
  readonly __wbg_get_pattern_top_loops: (a: number) => number;
  readonly __wbg_set_pattern_top_loops: (a: number, b: number) => void;
  readonly __wbg_get_pattern_bottom_loops: (a: number) => number;
  readonly __wbg_set_pattern_bottom_loops: (a: number, b: number) => void;
  readonly pattern_mappings: (a: number) => number;
  readonly pattern_mappings_count: (a: number) => number;
  readonly __wbg_mapping_free: (a: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
