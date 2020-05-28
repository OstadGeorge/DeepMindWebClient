var recordBtn = document.getElementById('record');
recordBtn.addEventListener('click', function (e) {
   if (recordBtn.classList.contains('btn-danger')) {
      recordBtn.classList.remove('btn-danger');
      recordBtn.classList.add('btn-warning');
      recordBtn.innerText = "دریافت تا این لحظه"
   }

   else {
      recordBtn.classList.remove('btn-warning');
      recordBtn.classList.add('btn-danger');
      recordBtn.innerText = "شروع ظبط کردن"
   }
});

var saveBtn = document.getElementById('saveContent');
saveBtn.addEventListener('click', function () {
   saveBtn.innerText = "... در حال ذخیره کردن";
   setTimeout(function () {
      saveBtn.innerText = "ذخیره محتوا";
   }, 1000)
});