/* GLOBAL ROMANTIC MUSIC CONTROLLER */

const MUSIC_SRC = "media/letter_song.mp3"; // main song

if(!window.globalMusic){

    window.globalMusic = new Audio(MUSIC_SRC);
    globalMusic.loop = true;

    /* restore time */
    const savedTime = localStorage.getItem("musicTime");
    if(savedTime){
        globalMusic.currentTime = savedTime;
    }

    /* restore volume */
    const savedVol = localStorage.getItem("musicVol");
    globalMusic.volume = savedVol ? parseFloat(savedVol) : 1;

}

/* safe play */
function playMusic(){
    globalMusic.play().catch(()=>{});
}

/* fade romantic */
function fadeMusic(){

    let vol = 0;
    globalMusic.volume = 0;

    playMusic();

    const fade = setInterval(()=>{

        vol += 0.02;

        if(vol >= 1){
            vol = 1;
            clearInterval(fade);
        }

        globalMusic.volume = vol;
        localStorage.setItem("musicVol", vol);

    },100);
}

/* save position */
setInterval(()=>{
    if(window.globalMusic){
        localStorage.setItem("musicTime", globalMusic.currentTime);
    }
},1000);
