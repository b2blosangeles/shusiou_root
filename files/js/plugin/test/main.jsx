React.createClass({
        getInitialState: function() {
          var me = this;
          return {}
        },
        goBackMyVideos: function() {
                window.location.href = '#/tutor/my_videos';
        },
        componentDidMount:function() {
               var me = this;
               me.init();
        },        
        init : function() {
                var meObj = this;               
 
           //     var me = this;
          //      me.props.parent.goBackMyVideos();
                 var uploadResult = {};
                function showResult() {
                     str = '';
                     for(k in uploadResult) {
                          if (uploadResult[k].src) {
                               str += k + ':<img src="' + uploadResult[k].src + '" width="300" /><br/>';
                          } else {
                               str += k + ' Completed: ' + uploadResult[k].perc + '%<br>';
                          }
                     }
                     $('#upload_result' ).html(str);
                }   
                function showMatrix(v) {
                     str = '';
                     for(k in v) {
                          if (v[k] === 'D') {
                               str += '*';
                          } else if  (v[k] === '') { 
                               str += '';
                          }else {
                               str += '.';
                          }
                     }
                     $('#upload_mitrix' ).html(str);
                } 

             //   setTimeout(function() {  

                    var D = new DropBox({
                                    holder : $('body')[0],
                                    basket : $('#holder')[0],
                                    sliceSize : 1024 * 64,
                                    threads : 3,
                                    progress : function(M, sourceFn, percent_done) {
                                         if (!uploadResult[sourceFn]) uploadResult[sourceFn] = {};
                                         uploadResult[sourceFn]['perc'] = percent_done;
                                         showResult();
                                         showMatrix(M);
                                    },
                                    UploadServer : '/api/upload.api',
                                    done : function(M, sourceFn, data) {
                                         $("#dbi-file-upload").val('');
                                         if (!uploadResult[sourceFn]) uploadResult[sourceFn] = {};
                                         uploadResult[sourceFn].src = '/api/sendup.api?fn=' + data.fn + '&nocache=' + new Date().getTime();
                                         showResult();
                                         showMatrix(M);
                                    },
                                    error : function() {
                                         $('#upload_result' ).html('Upload failure!!!');
                                    },       
                                    submitTrigger : $('#dbi-file-upload-submit')
                                    // 'auto'
                                    // 

                    });
                    D.init();
                 //   console.log('===D222===');   
                //}, 2000);  

             // =================   
                
        },
        render: function() {
          var me = this;
          return  (<span>
                         File Upload &nbsp;
                         <button className="btn btn-success" onClick={me. goBackMyVideos.bind(me)}>
                                 Go Back
                         </button>
                          <hr/>
                                <div id="holder">
                                  </div> 
                                  <p id="upload" class="hidden"><label>Drag & drop not supported, but you can still upload via this input field:<br/><input type="file"/></label></p>
                                  <p id="filereader">File API & FileReader API not supported</p>
                                  <p id="formdata">XHR2's FormData is not supported</p>
                                  <p id="progress">XHR2's upload progress isn't supported</p>
                                  <p>Upload progress: <progress id="uploadprogress" max="100" value="0">0</progress></p>
                                  <p>Drag an image from your desktop on to the drop zone above to see the browser both render the preview, but also upload automatically to this server.</p>
                                  <br/><hr/>
                                      <a className="btn btn-warning" id="dbi-file-upload-submit" href="Javascript:void(0)">Upload</a>
                                      <hr/>
                          <div className="progress" style={{'height': '6px'}}>
                                <div className="progress-bar" role="progressbar" style={{width: me.state.percentDone}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                         </div>
                                        <hr/><br/>
                                <div id = "upload_result"></div>
                                <div id = "upload_mitrix"></div>                        
                 </span>)
        }
});
