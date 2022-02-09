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
