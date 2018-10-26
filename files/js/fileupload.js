    var FILEUPLOAD = function(setting) {
        this.slice_size = 1024 * 5;
        this.ses = null;
        this.holded = {}; 
        this.file = {};
        this.inProcess = {};
        var size_done = 0, upload_M = {};

        
        
        this.getPos = function() {
            var me = this;
            for(var k in upload_M) {
                if (['','D'].indexOf(upload_M[k]) === -1) {
                    if (new Date().getTime() - parseInt(upload_M[k]) > 6000) {
                        me.holded[k] = (!me.holded[k]) ? 1 : me.holded[k] + 1;
                        if (me.holded[k] > 2) {
                            clearInterval(me._ITV);
                            (setting.error) ? setting.error() : '';
                            return false;
                        }
                        upload_M[k] = '';
                    }
                    return false;
                } else if (Object.keys(me.inProcess).length > 6) {
                    return false;
                
                } else if (upload_M[k] === '') {
                    me.inProcess[k] = true;
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
                var blob = me.file.slice( pos, pos + me.slice_size);
                var size_done = pos + me.slice_size - 1; 
                var percent_done = Math.min(Math.floor( ( size_done / me.file.size ) * 100 ), 100);
                (setting.progress) ? setting.progress(upload_M, me.file.name, percent_done) : '';

                me.reader.onloadend = function( event ) {
                    var d = event.target.result.split( ';base64,');
                    if ( event.target.readyState === FileReader.DONE ) { 
                        me.ajaxUpload(pos, d[1]);
                    }
                };        
                me.reader.readAsDataURL( blob );
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
                        delete me.inProcess[pos];
                        upload_M[pos] = 'D';
                        console.log('====me.inProcess===>');
                        console.log(me.inProcess);
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
                  (setting.done) ? setting.done(upload_M, me.file.name, data) : '';
              },
              dataType: 'JSON'
            }); 
        }  
        this.upload = function() {
            var me = this;
            me.reader = new FileReader();
            me.file = setting.file;
            for (var i=0; i < me.file.size; i+= me.slice_size) {
                upload_M[i] = '';
            }
            me._ITV = setInterval(me.upload_file(), 20);
        }        
    }
