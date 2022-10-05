use wasm_bindgen::prelude::wasm_bindgen; //import  bindgen to allow communciaiton between rust and js
use web_sys::console::log_1 as log; //import only log1 functionf rom web.sys
use base64::{decode, encode};
use image::load_from_memory;
use image::ImageOutputFormat::Png;

#[wasm_bindgen] //tell function to use wasm-bingen macro
pub fn grayscale (encoded_file: &str) -> String {
    log(&"grayscale called".into());
    
    let base64_to_vector = decode(encoded_file).unwrap();
    log(&"image decoded".into());
    
    let mut img = load_from_memory(&base64_to_vector).unwrap();
    log(&"image loaded".into());
    
    img = img.grayscale();
    log(&"grayscale effect applied".into());
    
    let mut buffer = vec!();
    img.write_to(&mut buffer, Png);
    log(&"new image ready".into());
    
    let encoded_img = encode(&buffer);
    let data_url = format!(
        "data:image/png;base64,{}", encoded_img
    );

    data_url
}