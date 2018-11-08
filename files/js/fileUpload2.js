(function () { 
		var obj =  function () {
			this.serial = function(q, cbk, timeout) {
				var me = this;
				var idx = '', tm = new Date().getTime();
				var vtime = (isNaN(timeout) || timeout == 0)?6000:timeout
				me.data = {};	
				var _f = function(o) {
					return function(res) {
						delete q[o];
						idx = '';
						me.data[o] = res;
					}
				}
				var _itv = setInterval(
					function(){
						if (!idx) {
							if (!Object.keys(q).length) {
								clearInterval(_itv);
								cbk({_spent_time:new Date().getTime() - tm, status:'success', results:me.data});
							} else {
								idx = Object.keys(q)[0];
								if ((q[idx]) && typeof q[idx] == 'function') {
									if (!me.exit) {
										q[idx](_f(idx));
									} else {
										delete q[idx];
										idx = '';
									}
								} 
							}
						}
						if (new Date().getTime() - tm > vtime) {
							clearInterval(_itv);
							cbk({_spent_time:new Date().getTime() - tm, status:'timeout', results:me.data});
						}				
						return true;
					}
				, 1); 
			};
			this.parallel = function(q, cbk, timeout) {
				var me = this;
				var tm = new Date().getTime(), vtime = (isNaN(timeout) || timeout == 0)?6000:timeout;
				
				me.data = {};	
				var count_q = 0, count_r = 0;
				for (var o in q) {
					count_q++;	
					var _f = function(o) {
						return function(res) {
							count_r++;
							me.data[o] = res;
						}
					}
					if ((q[o]) && typeof q[o] == 'function') {
						q[o](_f(o));
					} 						
				}
				var _itv = setInterval(
					function(){			
						if (count_q == count_r) {
							clearInterval(_itv);
							cbk({_spent_time:new Date().getTime() - tm, status:'success', results:me.data});
							console.log(new Date());
						}
						if (new Date().getTime() - tm > vtime) {
							clearInterval(_itv);
							cbk({_spent_time:new Date().getTime() - tm, status:'timeout', results:me.data});
							console.log(new Date());
						}				
						return true;
					}
				, 1); 		
			};
		};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} else {
		window.crowdProcess = function() {
			return obj; 
		}
	}
})();

var CP = crowdProcess();

var FILEUPLOAD = function(setting) {
        this.slice_size = (setting.sliceSize) ? setting.sliceSize : (1024 * 16);
        this.ses = null;
        this.holded = {}; 
        this.file = {};
        this.inProcess = {};
        this.upload_M = {};
        var size_done = 0;
        this.getPos = function() {
            var me = this;
            for(var k in me.upload_M) {
                if (['','D'].indexOf(me.upload_M[k]) === -1) {
                    if (new Date().getTime() - parseInt(me.upload_M[k]) > 6000) {
                        me.holded[k] = (!me.holded[k]) ? 1 : me.holded[k] + 1;
                        if (me.holded[k] > 2) {
                            clearInterval(me._ITV);
                            (setting.error) ? setting.error() : '';
                            return false;
                        }
                        me.upload_M[k] = '';
                    }
                }                
            }
            for(var k in me.upload_M) {
               
               if (Object.keys(me.inProcess).length > (me.threads - 1)) {
                    return false;
               } else if (me.upload_M[k] === '') {
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
                me.upload_M[pos] = new Date().getTime();
                var blob = me.file.slice( pos, pos + me.slice_size);
                var size_done = pos + me.slice_size - 1; 
                var percent_done = Math.min(Math.floor( ( size_done / me.file.size ) * 100 ), 100);
                (setting.progress) ? setting.progress(me.upload_M, me.file.name, percent_done) : '';

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
                    if (!me.ses) me.ses = data.ses;
                    if (data.status === 'success') {
                        delete me.inProcess[pos];
                        me.upload_M[pos] = 'D';
                     }
              },
              dataType: 'JSON'
            }); 
        }  
       this.init = function(cbk) {
           var me = this;
           $.ajax({
              type: "POST",
              url: '/api/upload.api',
              data: {},
              success: function(data) {
                  if (!me.ses) me.ses = data.ses;
                  cbk();
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
                  (setting.done) ? setting.done(me.upload_M, me.file.name, data) : '';
              },
              dataType: 'JSON'
            }); 
        }  
        this.upload = function() {
            var me = this;
            me.threads = (setting.threads) ? setting.threads : 1;
            me.reader = new FileReader();
            me.file = setting.file;
            for (var i=0; i < me.file.size; i+= me.slice_size) {
                me.upload_M[i] = '';
            }
            me.init(
                function() {
                     me._ITV = setInterval(me.upload_file(), 20);
                });
        }        
    }
