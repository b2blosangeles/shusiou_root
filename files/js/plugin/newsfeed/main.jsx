React.createClass({
        getInitialState: function() {
          var me = this;
          return {}
        },
        componentDidMount:function() {
               var me = this;
        },        
        pickMenu : function(code) {
                var me = this;
        },
        render: function() {
          var me = this;
                /*me. goBackMyVideos.bind(me)*/
          return  (
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <button className="btn btn-success" onClick={me.pickMenu.bind(me, 'key')}>
                                 Go Back
                                </button>
                            </div>
                            <div className="col-sm-2">
                              One of three columns
                            </div>
                            <div className="col-sm-2">
                              One of three columns
                            </div>
                         </div>
                    </div>          
          )
        }
})
