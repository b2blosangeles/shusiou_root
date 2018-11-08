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

var DropBox = function(_setting) {
    
    this.holder = _setting.holder;
    this.basket = _setting.basket;
    
    this.fileBuffer = null;
    
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
            this.className = '';
            e.preventDefault();
              fileBuffer = e.dataTransfer.files;
              me.previewfiles(e.dataTransfer.files);
              me.fileBuffer = e.dataTransfer.files;
              if (_setting.submitTrigger === 'auto') {
                   if (me.fileBuffer)  me.uploadFiles(me.fileBuffer);
              }

          } 
          if (typeof _setting.submitTrigger === 'object') {
              $(_setting.submitTrigger).on( 'click', function(event) {
                    if (me.fileBuffer) me.uploadFiles(me.fileBuffer);
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
                        sliceSize : (_setting.sliceSize) ? _setting.sliceSize : 1024 * 16,
                        threads : (_setting.threads) ? _setting.threads : 5,
                        progress : function(M, sourceFn, percent_done) {
                             _setting.progress(M, sourceFn, percent_done);
                        },
                        done : function(M, sourceFn, data) {
                             _setting.done(M, sourceFn, data);
                        },
                        error : function() {
                             if (_setting.error) _setting.error();
                        }

                    }
                  )
                 up[i].upload();
             }
    }    
}
