use std::cmp::Ordering;
use std::cmp::Ord;

pub fn get_pattern(top_loops: usize, bottom_loops: usize) -> Pattern {

    // get top so that top/bottom is a whole number

    let mut top_steps = top_loops/bottom_loops;

    if top_steps * bottom_loops != top_loops {
        top_steps += 1;
    }

    let fake_top = top_steps * bottom_loops;

    let phantoms = fake_top - top_loops;

    //println!("{:?}, {} {}", top_steps, fake_top, phantoms);

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
                    mappings.push(Mapping {top_index, bottom_index });
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

#[derive(Debug, Clone)]
pub struct Pattern {
    top_loops: usize,
    bottom_loops: usize,
    mappings: Vec::<Mapping>,
}

#[derive(Copy, Clone, Debug, Eq)]
pub struct Mapping {
    top_index: usize,
    bottom_index: usize
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

    //#[test]
    fn test_32_9() {

        let pattern = get_pattern(32, 9);

        println!("{:?}", pattern.mappings.len());
        println!("{:#?}", pattern);
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

    #[test]
    fn test_145_125() {
        let pattern = get_pattern(145, 125);

        let mut last_bot = -1;

        let mut i = 0;
        for mapping in pattern.mappings {

            if last_bot == mapping.bottom_index as i32 {
                println!("{:?}", i );
                i = -1;
            }

            last_bot = mapping.bottom_index as i32;
            i += 1;

            //println!("{:?}", mapping);

        }

        assert_eq!(true, false);
    }
}
