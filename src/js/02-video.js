import Player from '@vimeo/player';
import throttle from 'lodash.throttle'

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCAL_TIME = "videoplayer-current-time";
const currentTime = localStorage.getItem(LOCAL_TIME);

player.on('timeupdate', throttle(onCurrentTime, 1000));

player.setCurrentTime(currentTime).then(function(seconds) {
    
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

function onCurrentTime (currentTime) {
    const time = currentTime.seconds;
    localStorage.setItem(LOCAL_TIME, JSON.stringify(time));
    
}

