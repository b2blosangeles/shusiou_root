
    var FILEUPLOAD = function(setting) {
        var reader = {}, file = {}, slice_size = 1024 * 4, size_done = 0,
            ses = null, upload_M = {}, _ITV;

        function getPos() {
            var me = this;
            for(var k in upload_M) {
                if (['','D'].indexOf(upload_M[k]) === -1) {
                    return false;
                } else if (upload_M[k] === '') {
                    return parseInt(k);
                }                
            }  
            clearInterval(_ITV);
            ajaxFinished();
            return 'finished'
        }

       function upload_file() {
            var pos = getPos();
            if (pos === false || pos === 'finished')  return true;     
            upload_M[pos] = new Date().getTime();
            var blob = file.slice( pos, pos + slice_size);
            var size_done = pos + slice_size - 1; 
            var percent_done = Math.min(Math.floor( ( size_done / file.size ) * 100 ), 100);
            (setting.progress) ? setting.progress(file.name, percent_done) : '';
            
            reader.onloadend = function( event ) {
                var d = event.target.result.split( ';base64,');
                if ( event.target.readyState === FileReader.DONE ) { 
                    ajaxUpload(pos, d[1],
                              function(data) {
                                  ses = data.ses;
                                  upload_M[pos] = 'D';
                    });
                }
            };        
            reader.readAsDataURL( blob );
        }

        function ajaxUpload(pos, dt, cbk) {
            $.ajax({
              type: "POST",
              url: '/api/upload.api',
              data: {pos:pos, data:dt, ses: ses},
              success: function(data) {
                  if (typeof cbk == 'function') {
                    cbk(data);
                  }
              },
              dataType: 'JSON'
            }); 
        }    
        function ajaxFinished() {
            $.ajax({
              type: "POST",
              url: '/api/upload.api',
              data: {pos:'finished', ses: ses},
              success: function(data) {
                  (setting.done) ? setting.done(data) : '';
              },
              dataType: 'JSON'
            }); 
        }  
        this.upload = function() {
            var me = this;
            // event.preventDefault();
            reader = new FileReader();
            // file = setting.fileField.files[setting.fileIDX];
            file = setting.file;
            for (var i=0; i < file.size; i+= slice_size) {
                upload_M[i] = '';
            }
            _ITV = setInterval(upload_file, 10);
        }        
    }
