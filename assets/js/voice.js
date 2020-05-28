URL = window.URL || window.webkitURL;

var gumStream;
var rec;
var input;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext({ sampleRate: 16000 });

var recordBtn = document.getElementById('record');

recordBtn.addEventListener("click", handleRecording);

function handleRecording() {
    if (recordBtn.classList.contains('btn-danger')) {
        stopRecording()
    } else {
        startRecording();
    }
}

function startRecording() {
    var constraints = { audio: true, video: false }
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 });
        rec.record();
    }).catch(function (err) { });
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