use rust_knitting_matcher as rkm;

fn main() {
    let pattern = rkm::get_pattern(204, 180);

    let mut cur = -1;
    let mut count = 1;

    let mappings_ptr = pattern.mappings();

    for i in 0..pattern.mappings_count() {
        let mapping = unsafe {*mappings_ptr.offset(i as isize)};
        if mapping.bottom_index as i32 == cur {
            println!("{:?}", count - 1);
            count = 0;
        }
        count += 1;

        cur = mapping.bottom_index as i32;
    }
}
