var DropBox = function(setting) {
    this.holder = $('body')[0];
    this.fileBuffer = null;
    this.basket = $('#holder')[0];
    this.tests = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: "upload" in new XMLHttpRequest
    };
    this.support = {
      filereader: document.getElementById('filereader'),
      formdata: document.getElementById('formdata'),
      progress: document.getElementById('progress')
    };
    this.acceptedTypes = ['image/png','image/jpeg','video/mp4'];

    this.previewfiles = function(files) {
         var me = this;
        var formData = me.tests.formdata ? new FormData() : null;
        for (var i = 0; i < files.length; i++) {
          if (me.tests.formdata) me.formData.append('file', files[i]);
          me.previewfile(files[i]);
        }       
    }     
    this.previewfile = function(file) {
        var me = this;
      if (me.tests.filereader === true && me.acceptedTypes.indexOf(file.type) !== -1) {
        var reader = new FileReader();
        reader.onload = (function(me) {
            return function (event) {
              var image = new Image();
              image.src = event.target.result;
              image.width = 250; // a fake resize
              me.basket.appendChild(image);
            }
        }(me));

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
              console.log('====ondrop===>e.dataTransfer.files===' + e.dataTransfer.files.length);

          }    
    }
}
