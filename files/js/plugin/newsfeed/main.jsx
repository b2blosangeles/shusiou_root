React.createClass({
        getInitialState: function() {
          var me = this;
          return {}
        },
        componentDidMount:function() {
               var me = this;
               me.init();
        },        
        init : function() {
                var me = this;
        },
        render: function() {
          var me = this;
          return  (
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <button className="btn btn-success" onClick={/*me. goBackMyVideos.bind(me)*/}>
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
