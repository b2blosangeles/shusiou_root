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
                            {me.menu.map(function(m){ 
				return(
                                <div className="col-sm-2">
                                                <button className="btn btn-success" onClick={me.pickMenu.bind(me, m.code)}>
                                                        {m.code}
                                                </button>
                                </div>)
                             })}
                         </div>
                    </div>          
          )
        }
})
