React.createClass({
        getInitialState: function() {
		var me = this;
		me.menu = [];		
          	return {}
        },
        componentDidMount:function() {
               var me = this;
		me.init();
        }, 
        init : function(code) {
                var me = this;
 		me.menu = _global.menu;
		me.setState({option: ''});
        },        
        pickMenu : function(code) {
                var me = this;
                me.setState({option: code});
        },
        render: function() {
          var me = this;
          return  (
                    <div className="container">
                        <div className="row">
				<div className="col-sm-12">
                            	{me.menu.map(function(m){
					if (m.code !== me.state.option) {
						return(<button className="btn btn-success" onClick={me.pickMenu.bind(me, m.code)}>
								{m.caption}
							</button>)
					}  else {
						return(<button className="btn btn-default">
								{m.module}
							</button>)
					}
				})}
                                </div>
                         </div>
                        <div className="row">
				<div className="jumbotron mt-1">
                            	{me.menu.map(function(m){
					if (m.code === me.state.option) {
						return(<span>{m.caption}</span>)
					}
				})}
                                </div>
                         </div>			  
                    </div>          
          )
        }
})
