use std::cmp::Ordering;
use std::cmp::Ord;

mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}



#[wasm_bindgen]
pub fn get_pattern(top_loops: usize, bottom_loops: usize) -> Pattern {

    // get top so that top/bottom is a whole number


    let mut top_steps = top_loops/bottom_loops;

    if top_steps * bottom_loops != top_loops {
        top_steps += 1;
    }

    let fake_top = top_steps * bottom_loops;

    let phantoms = fake_top - top_loops;

    println!("{:?}, {} {}", top_steps, fake_top, phantoms);

    let mut top_with_fakes = vec![Entry::Fake; fake_top];

    let fake_interval = top_loops as f64 / phantoms as f64;

    let mut next_real = 0;
    let mut next_fake = fake_interval;



    // Assign real entries to the full fake top_with_fakes
    // We should only have #phantom fakes in total after
    for i in 0..top_with_fakes.len() {
        if next_real > (next_fake as usize) - 1 {
            next_fake += fake_interval;
        }
        else {
            top_with_fakes[i] = Entry::Real(next_real);
            next_real += 1;
        }
    }
    assert_eq!(phantoms, top_with_fakes.clone().iter().filter(|&n| *n == Entry::Fake).count());



    let mut mappings = vec![];

    let mut set = 0;

    let mut start = 0;
    while set < top_loops {
        let mut bottom_index = 0;
        for i in (start..top_with_fakes.len()).step_by(top_steps) {
            match top_with_fakes[i] {
                Entry::Real(top_index) => {
                    set += 1;
                    mappings.push(Mapping {top_index: top_index as u32, bottom_index: bottom_index as u32 });
                },
                _ => {}
            };
            bottom_index += 1;
        }
        start += 1;
    }

    mappings.sort();
    Pattern {
        top_loops,
        bottom_loops,
        mappings,
    }
}

#[derive(Debug, Copy, Clone, PartialEq)]
enum Entry {
    Fake,
    Real(usize)
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct Pattern {
    pub top_loops: usize,
    pub bottom_loops: usize,
    mappings: Vec::<Mapping>
}

#[wasm_bindgen]
impl Pattern {
    pub fn mappings(&self) -> *const Mapping {
        self.mappings.as_ptr()
    }

    pub fn mappings_count(&self) -> u32 {
        self.mappings.len() as u32
    }
}



#[wasm_bindgen]
#[repr(C)]
#[derive(Copy, Clone, Debug, Eq)]
pub struct Mapping {
    top_index: u32,
    bottom_index: u32
}


impl Ord for Mapping {
    fn cmp(&self, other: &Self) -> Ordering {
        if self.top_index == other.top_index {
            return self.bottom_index.cmp(&other.bottom_index)
        }
        self.top_index.cmp(&other.top_index)
    }
}



impl PartialOrd for Mapping {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for Mapping {
    fn eq(&self, other: &Self) -> bool {
        self.top_index == other.top_index && self.bottom_index == other.bottom_index
    }
}


#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_6_4() {
        let pattern = get_pattern(6, 4);

        assert_eq!(pattern.mappings, vec![

            // To 0
            Mapping { top_index: 0, bottom_index: 0 },
            Mapping { top_index: 1, bottom_index: 0 },

            // To 1
            Mapping { top_index: 2, bottom_index: 1 },

            // To 2
            Mapping { top_index: 3, bottom_index: 2 },
            Mapping { top_index: 4, bottom_index: 2 },

            // To 3
            Mapping { top_index: 5, bottom_index: 3 },

        ]);
    }

    #[test]
    fn test_9_7() {
        let pattern = get_pattern(9, 7);

        assert_eq!(pattern.mappings, vec![

            // To 0
            Mapping { top_index: 0, bottom_index: 0 },

            // To 1
            Mapping { top_index: 1, bottom_index: 1 },
            Mapping { top_index: 2, bottom_index: 1 },

            // To 2
            Mapping { top_index: 3, bottom_index: 2 },

            // To 3
            Mapping { top_index: 4, bottom_index: 3 },

            // To 4
            Mapping { top_index: 5, bottom_index: 4 },
            Mapping { top_index: 6, bottom_index: 4 },

            // To 5
            Mapping { top_index: 7, bottom_index: 5 },

            // To 6
            Mapping { top_index: 8, bottom_index: 6 },
        ]);
    }
}
