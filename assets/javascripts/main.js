window.addEventListener("load", initEvents);
var audio;

function initEvents() {
    audio = document.querySelector("#audio");
    playBtn = document.querySelector("#play");
    playBtn.addEventListener("click", togglePlay);
    slider = document.querySelector("#slider");
    slider.addEventListener("change", seekSong);
    song_total_time = document.querySelector(".song_total_time");
    showAllSongs();
    document.querySelector("#search").addEventListener("keyup",search);
    
}

function showAllSongs() {
    var ul = document.querySelector("#songsList");
    songsList.forEach(function(obj) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = obj.song_thumb;
        img.className = "w-100";
        var span = document.createElement("span");
        span.innerHTML = obj.song_name;
        var btn = document.createElement("button");
        btn.innerHTML = "Add to playlist";
        btn.className = "btn btn-primary w-100";
        var playBtn = document.createElement("button");
        playBtn.className = "playBtn";
        playBtn.title = obj.song_id;
        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(btn);
        li.appendChild(playBtn);
        ul.appendChild(li);
        playBtn.addEventListener("click", playSong);
        btn.addEventListener("click", addToPlayList);
        
    }
    )
    
}

function playSong() {
    var song_id = event.srcElement.title;
    for (var i = 0; i < songsList.length; i++) {
        if (songsList[i].song_id == song_id) {
            var song_src = songsList[i].song_url;
            // var songname=songsList[i].song_name;
            // console.log(songname);
            // document.querySelector("#songName").innerHTML=songname;
        }
    }
    audio.src = song_src;
    audio.play();
    var songname=event.srcElement.parentElement.children[1].innerHTML;
    document.querySelector("#songName").innerHTML=songname;

    setInterval(function() {
        slider.value = audio.currentTime;
    }, 1000);
    setTimeout(function() {
        var duration = audio.duration;
        slider.max = duration;
        var min = parseInt(duration / 60);
        var sec = parseInt(duration % 60);
        song_total_time.innerHTML = "0" + min + ":" + sec;
    }, 500);
    flag = true;
    togglePlay();
    
}

function seekSong() {
    audio.currentTime = slider.value;
}

function togglePlay() {
    if (!flag) {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        audio.pause();
    } else {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audio.play();
    }
    flag = !flag;
}


function addToPlayList() {
    var songid = event.srcElement.parentElement.children[3].title;
    // console.log(songid);
    for (var i = 0; i < songsList.length; i++) {
        if (songsList[i].song_id == songid) {

            object.add(songsList[i].song_id, songsList[i].song_name,
                songsList[i].song_url, songsList[i].song_thumb)
            break
        }
    }
    showPlayList();
}

function deleteFromPlayList() {
    var songid = event.srcElement.parentElement.children[3].title;
    // console.log(songid);
    for (var i = 0; i < songsList.length; i++) {
        if (songsList[i].song_id == songid) {
            object.deleteSong(songsList[i].song_id);
            break
        }
    }
    showPlayList();
}

function showPlayList() {
    var ul = document.querySelector("#playList");
    ul.innerHTML = "";
    object.playList.forEach(function(obj) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = obj.img;
        img.className = "w-100";
        var span = document.createElement("span");
        span.innerHTML = obj.name;
        var btn = document.createElement("button");
        btn.innerHTML = "Delete";
        btn.className = "btn btn-primary w-75";
        var playBtn = document.createElement("button");
        playBtn.className = "playBtn";
        playBtn.title = obj.id;
        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(btn);
        li.appendChild(playBtn);
        ul.appendChild(li);
        playBtn.addEventListener("click", playSong);
        btn.addEventListener("click", deleteFromPlayList);
    })
}

function search(){
    var value=event.srcElement.value;
    // console.log(value);
    var ul = document.querySelector("#songsList");
    ul.innerHTML = "";
    for (var i = 0; i < songsList.length; i++){
        if(songsList[i].song_name.toLowerCase().includes(value.toLowerCase())){
            // console.log(songsList[i].song_name);
            
            var li = document.createElement("li");
            var img = document.createElement("img");
            img.src = songsList[i].song_thumb;
            img.className = "w-100";
            var span = document.createElement("span");
            span.innerHTML = songsList[i].song_name;
            var btn = document.createElement("button");
            btn.innerHTML = "Add to playlist";
            btn.className = "btn btn-primary w-100";
            var playBtn = document.createElement("button");
            playBtn.className = "playBtn";
            playBtn.title = songsList[i].song_id;
            li.appendChild(img);
            li.appendChild(span);
            li.appendChild(btn);
            li.appendChild(playBtn);
            ul.appendChild(li);
            playBtn.addEventListener("click", playSong);
            btn.addEventListener("click", addToPlayList);
            
        }
    }
}