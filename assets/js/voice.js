URL = window.URL || window.webkitURL;

var gumStream;
var rec;
var input;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;

var constraints = { audio: true, video: false }
navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    audioContext = new AudioContext({ sampleRate: 16000 })
    gumStream = stream;
    input = audioContext.createMediaStreamSource(stream);
}).catch(function (err) { });

var recordBtn = document.getElementById('record');

recordBtn.addEventListener("click", handleRecording);

var maxAudioLen = 2 * 60 * 1000;
var clicked = false;

function handleRecording() {
    if (recordBtn.classList.contains('btn-danger')) {
        stopRecording()
    } else {
        startRecording();
        setTimeout(function() {
            if(!clicked) {
                recordBtn.click();
            }
        }, maxAudioLen);
    }
}

function startRecording() {
    rec = new Recorder(input, { numChannels: 1 });
    rec.record();
}

function stopRecording() {
    rec.stop();
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(sendBlob);
}

function sendBlob(blob) {
    // این نشون میده فایل صوتی کار میکنه. 
    // console.log("obj Link: " + URL.createObjectURL(blob));
    // var au = document.createElement('audio');
    // au.controls = true;
    // au.src = URL.createObjectURL(blob);
    // document.body.appendChild(au);


    var request = new XMLHttpRequest();
    request.open("POST", "http://deepmine.ir/asr?endofspeech=false");
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            console.log(this.responseText);
        }
    }
    request.send(blob);
}
