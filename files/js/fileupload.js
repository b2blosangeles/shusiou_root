alert(62);
    var FILEUPLOAD = function(setting) {
        this.slice_size = 1024 * 16;
        this.ses = null;
        this.holded = {};    
        
        var reader = {}, file = {}, size_done = 0, upload_M = {};

        this.getPos = function() {
            var me = this;
            for(var k in upload_M) {
                if (['','D'].indexOf(upload_M[k]) === -1) {
                    if (new Date().getTime() - parseInt(upload_M[k]) > 6000) {
                        upload_M[k] = '';
                        me.holded[k] = (!me.holded[k]) ? 1 : me.holded[k] + 1;
                    }
                    if (me.holded[k] > 3) {
                        clearInterval(me._ITV);
                        console.log( me.holded);
                        return true;
                    }
                    return false;
                } else if (upload_M[k] === '') {
                    return parseInt(k);
                }                
            }  
            clearInterval(me._ITV);
            me.ajaxFinished();
            return 'finished'
        }

       this.upload_file = function() {
           var me = this;
           return function() {
                var pos = me.getPos();
                if (pos === false || pos === 'finished')  return true;     
                upload_M[pos] = new Date().getTime();
                var blob = file.slice( pos, pos + me.slice_size);
                var size_done = pos + me.slice_size - 1; 
                var percent_done = Math.min(Math.floor( ( size_done / file.size ) * 100 ), 100);
                (setting.progress) ? setting.progress(file.name, percent_done) : '';

                reader.onloadend = function( event ) {
                    var d = event.target.result.split( ';base64,');
                    if ( event.target.readyState === FileReader.DONE ) { 
                        me.ajaxUpload(pos, d[1]);
                    }
                };        
                reader.readAsDataURL( blob );
           }
        }

       this.ajaxUpload = function(pos, dt) {
           var me = this;
           $.ajax({
              type: "POST",
              url: '/api/upload.api',
              data: {pos:pos, data:dt, ses: me.ses},
              success: function(data) {
                    me.ses = data.ses;
                    if (data.status === 'success') {  
                        upload_M[pos] = 'D';
                     }
              },
              dataType: 'JSON'
            }); 
        }    
        this.ajaxFinished = function () {
            var me = this;
            $.ajax({
              type: "POST",
              url: '/api/upload.api',
              data: {pos:'finished', ses: me.ses},
              success: function(data) {
                  (setting.done) ? setting.done(file.name, data) : '';
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
            for (var i=0; i < file.size; i+= me.slice_size) {
                upload_M[i] = '';
            }
            me._ITV = setInterval(me.upload_file(), 20);
        }        
    }
