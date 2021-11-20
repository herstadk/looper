// effect to cause the record button to flash while it is recording, indicating to
// the user they are interacting with the web page

let playing = false;

if(document.readyState === 'ready' || document.readyState === 'complete') {
    flash();
} else {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            flash();
        }
    }
}

function flash() {
    let recordIcon = document.getElementById('recordIcon');
    recordIcon.addEventListener('click', () => {
        if (!playing) {
            playing = true;
            while (true) {
                recordIcon.style.visibility = 'hidden';
                sleep(1000);
                recordIcon.hidden = 'visible';
                sleep(1000);
            }
        }
        else {
            playing = false;
            recordIcon.hidden = 'visible';
        }
    });
}

flash();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
