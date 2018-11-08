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
          if (me.tests.formdata) formData.append('file', files[i]);
          me.previewfile(files[i]);
        }       
    }     
    this.previewfile = function(file) {
        var me = this;
      if (me.tests.filereader === true && me.acceptedTypes.indexOf(file.type) !== -1) {
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
              console.log('----------->e.dataTransfer.files===' + e.dataTransfer.files.length);
              me.fileBuffer = e.dataTransfer.files;

          } 
          if (typeOf setting.submitTrigger === 'function') {
              $(setting.submitTrigger).on( 'click', function(event) {
                    if (me.fileBuffer) {
                        me.uploadFiles(me.fileBuffer);
                    }
               })
          }
    }
    this.uploadFiles = function  (files) {
      //  debugger;
            var up = [];
             for (var i = 0; i < files.length; i++) {
                up[i] = new FILEUPLOAD(
                    {
                        file: files[i],
                        sliceSize : 1024 * 16,
                        threads : 5,
                        progress : function(M, sourceFn, percent_done) {
                             if (!uploadResult[sourceFn]) uploadResult[sourceFn] = {};
                             uploadResult[sourceFn]['perc'] = percent_done;
                             showResult();
                             showMatrix(M);
                             //console.log(me.upload_M);
                        },
                        done : function(M, sourceFn, data) {
                             $("#dbi-file-upload").val('');
                             if (!uploadResult[sourceFn]) uploadResult[sourceFn] = {};
                             uploadResult[sourceFn].src = '/api/sendup.api?fn=' + data.fn + '&nocache=' + new Date().getTime();
                             showResult();
                             showMatrix(M);
                        },
                        error : function() {
                             $('#upload_result' ).html('Upload failure!!!');
                        }

                    }
                  )
                 up[i].upload();
             }
    }    
}
