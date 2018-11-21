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
 		me.menu = [
			{code: 'A1', caption: 'A1', module:'A1'},
			{code: 'A2', caption: 'A2', module:'A2'},
			{code: 'A3', caption: 'A3', module:'A3'}
		];
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
								{m.caption}
							</button>)
					}
				})}
                                </div>
                         </div>
                        <div className="row">
				<div className="jumbotron border-primary">
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
