React.createClass({
        getInitialState: function() {
          var me = this;
          return {}
        },
        componentDidMount:function() {
               var me = this;
        }, 
        inti : function(code) {
                var me = this;
                me.menu = [
                        {code: 'A1', module:'A1'},
                        {code: 'A2', module:'A2'},
                        {code: 'A3', module:'A3'}
                ]
        },        
        pickMenu : function(code) {
                var me = this;
                alert(code);
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
