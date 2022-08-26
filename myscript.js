console.log("welcome to js");

let songIndex = 0;
let audioElement = new Audio('songs/3.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Dil Hi Toh Hai", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Janib-Duet", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Aayat-Bajirao Mastani", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Befikre", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Galti Se Mistake", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Raabta-Rabta Title Track", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Lal Ishq-Ramleela", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Duaa-Shanghai", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Sun Le Zara", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Dilliwali Girlfriend", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play(); 
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
    }
});
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    console.log(progress);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

// function to change all icons of songPlayItems to play icon
const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        if(songIndex === parseInt(e.target.id) && !audioElement.paused){
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
        else{
            songIndex = parseInt(e.target.id);
            audioElement.src = `songs/${songIndex+1}.mp3`;  // ` is not single quote it is (` present with ~ ) not ('')
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        
        }

       

    });
});

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex==0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex<9){
        songIndex+=1;
    }
    else{
        songIndex=0;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
     
