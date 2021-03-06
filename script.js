function fetchSongs() {

    $.ajax({
        'url': 'https://api.jsonbin.io/b/5a33ec99e16b1771645da15d',
        'dataType': 'json',
        'method': 'GET',
        'success': function (responseData) {
        	// do something with the data here
        	songs = responseData ;
        	setUpPlaylist() ;
            changeCurrentSongDetails(0);
          
        }
    });

}


$('.welcome-screen button').on('click', function() {
	var name = $('#fname-input').val();
	var last = $('#lname-input').val();
	//console.log(name);
	if(name.length > 2 && last.length >4) {
		$('.welcome-screen').addClass('hidden');
		$('.main').removeClass('hidden');

		var message = "Welcome " + name + " " + last;
		//console.log(message);

		$('.user-name').text(message);
		fetchSongs() ;
	}else {
		$('#fname-input').addClass('border border-danger');
		$('#lname-input').addClass('border border-danger');
		$('.f-error').html('First name should be more than 2');
		$('.l-error').html('Last name should be more than 4');
	}
});


$('.main .logout button').on('click', function() {
	
	
	$('.welcome-screen').removeClass('hidden');
	$('.main').addClass('hidden');

});

$('.play-icon').on('click',function() {
  	var song = document.querySelector('audio');
  	toggleSong();
});

$('body').on('keyup',function(event) {
	if (event.keyCode == 32){
		var song = document.querySelector('audio');
		toggleSong();
	}
	else if(event.keyCode == 80){
		var song = document.querySelector('audio');
		toggleSong();
	}
}); 

function updateCurrentTime() {
  	var song = document.querySelector('audio');

  	var currentTime = Math.floor(song.currentTime);
  	currentTime = fancyTimeFormat(currentTime);

  	var duration = Math.floor(song.duration);
  	duration = fancyTimeFormat(duration);
  	// Get the elements with the class and set the text
  	$('.time-elapsed').text(currentTime);
  	$('.song-duration').text(duration);
}



function toggleSong() {
	var song = document.querySelector('audio');

  	if(song.paused == true) {
	    console.log('Playing');
		$('.play-icon').removeClass('fa-play').addClass('fa-pause');
		song.play();
	}
   	else{
		console.log('Pausing');
		$('.play-icon').removeClass('fa-pause').addClass('fa-play');
		song.pause();
	}

	updateCurrentTime();
	setInterval(function() {
        updateCurrentTime();
    },1000);
} 

function fancyTimeFormat(time){   
	// Hours, minutes and seconds
	var hrs = ~~(time / 3600);
	var mins = ~~((time % 3600) / 60);
	var secs = time % 60;

	// Output like "1:01" or "4:03:59" or "123:03:59"
	var ret = "";

	if (hrs > 0){
		ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
	}

	ret += "" + mins + ":" + (secs < 10 ? "0" : "");
	ret += "" + secs;
	return ret;
} 

			// var songList = ['Badri Ki Dulhania (Title Track)','Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song'];
			// var fileNames = ['song1.mp3', 'song2.mp3', 'song3.mp3','song4.mp3'];
			// var artistList = ['Artist #1', 'Artist #2','Artist #3','Artist #4']; 
			// var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil'];
			// var durationList = ['2:56','3:15','2:34','2:29'];
var songs = [];

			
var currentSongPosition = null ;

function setUpPlaylist() {
    var songDetailsHTML = '<span class="song-name"> </span><span class="song-artist"> </span> <span class="song-album"> </span><span class="song-length"> </span>' ;

    $('.total').append(songs.length);
    for(var i=0; i < songs.length ; i++) {
	    var song = songs[i];
	    $('.song-list').append('<div id="song' + i + '" class="song">'+ songDetailsHTML +'</div>') ;
	    $('#song'+ i + ' .song-name').text(song.name);
		$('#song'+ i + ' .song-artist').text(song.artist);
		$('#song'+ i + ' .song-album').text(song.album);
		$('#song'+ i + ' .song-length').text(song.duration);
	    $('#song'+ i).attr('data-song-position', i) ;

		$('#song' + i).click(function() {
	        // Selecting audio element and storing it in a variable
	        var audio = document.querySelector('audio');
		        if ($(this).attr('data-song-position') != currentSongPosition){
			        // Getting the value when clicked
			     	var songPosition = $(this).attr('data-song-position');
			     	changeCurrentSongDetails(songPosition);
			     	audio.src = songs[parseInt(songPosition)].fileName ;

			     	currentSongPosition = songPosition ;
			    }
		  						
		  	toggleSong();
		});
 	}
}

function changeCurrentSongDetails(songPosition) {
	var songObj = songs[songPosition] ;
	$('.current-song-image').attr('src',songObj.image) ;
	$('.current-song-name').text(songObj.name) ;
	$('.current-song-album').text(songObj.album) ;
}