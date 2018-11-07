var DropBox = function(setting) {
    this.holder = $('body')[0];
    this.fileBuffer = null;
    this.basket = $('#holder')[0];
    me.tests = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: "upload" in new XMLHttpRequest
    };
    me.support = {
      filereader: document.getElementById('filereader'),
      formdata: document.getElementById('formdata'),
      progress: document.getElementById('progress')
    };
    me.acceptedTypes = {
      'image/png': true,
      'image/jpeg': true,
      'image/gif': true,
      'video/mp4': true
    };
    
    this.previewfile = function(file) {
      if (me.tests.filereader === true && me.acceptedTypes[file.type] === true) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var image = new Image();
          image.src = event.target.result;
          image.width = 250; // a fake resize
          me.basket.appendChild(image);
        };

        reader.readAsDataURL(file);
      }  else {
        me.basket.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
        console.log(file);
      }
    }    
    this.init = function () {
          var me  = this;
          me.holder.ondragover = function () { 
            this.className = 'hover'; return false; 
          };
          me.holder.ondragend = function () { 
            this.className = ''; return false; 
          };
          me.holder.ondrop = function (e) {
            console.log('====ondrop===');
            this.className = '';
            e.preventDefault();
              fileBuffer = e.dataTransfer.files;
              me.previewfiles(e.dataTransfer.files);
              console.log('====ondrop===>e.dataTransfer.files');

          }    
    }
}
