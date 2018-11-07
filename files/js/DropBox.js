var DropBox = function(setting) {
    this.holder = $('body')[0];
    this.fileBuffer = null;
    this.basket = $('#holder')[0];
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
