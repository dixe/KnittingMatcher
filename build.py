import shutil
import os
# Build the wasm to pkg
os.system('wasm-pack build --release --target web')


# copy files to docs
print("[INFO]: Copying files from pkg to docs");
shutil.copy('pkg/rust_knitting_matcher.js', 'docs/rust_knitting_matcher.js');
shutil.copy('pkg/rust_knitting_matcher_bg.wasm', 'docs/rust_knitting_matcher_bg.wasm');
shutil.copy('pkg/rust_knitting_matcher_bg.wasm.d.ts', 'docs/rust_knitting_matcher_bg.wasm.d.ts');
shutil.copy('pkg/rust_knitting_matcher.d.ts', 'docs/rust_knitting_matcher.d.ts');
shutil.copy('pkg/package.json', 'docs/package.json');
