async function init() {
    let rustApp = null;

    try{
        rustApp = await import('../pkg')
    } catch(e){
        console.error(e);
        return;
    }

    const input = document.getElementById('upload')     //get input field
    const fileReader = new FileReader();                //initialize fileReader

    fileReader.onloadend = () => {                      //when uplaod has finished
        const base64 = fileReader.result                //get base64-string and emtadata of image from browser
        .replace(
            /^data:image\/(png|jpeg|jpg);base64,/, ''   //remove browser metadata from base64 string
        )

        let img_data_url = rustApp.grayscale(base64);                           //call rust function 
        
        document.getElementById("new-img").setAttribute('src', img_data_url);   //set img tag to new image, browser can handle base64 img data url directly
    }

    input.addEventListener('change', ()=>{
        fileReader.readAsDataURL(input.files[0])        //starts here: triggered by change-event on input-tag, read file as base64-string
    })
};

init();
