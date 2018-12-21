React.createClass({
        getInitialState: function() {
	        var me = this;
                me.result = {};
		me.tables = [];
		me.dbs = [];
		me.callQuery('SHOW TABLES', me.showTables);
	        return {}    
        },
       showTables : function(data) {
	    var me = this; 
	    me.tables = [];
	        console.log(data);
	    for (var i = 0; i< data.length; i++) {
		 for (var key in data[i]) {   
		 	me.tables.push( data[i][key])
			 break;
		 }
	    }
	    console.log(me.tables);
	    me.setState({updated: new Date().getTime()});   
        },
        callQuery : function(query, cbk) {
	    var me = this;
            $.ajax({
                url: '/api/platoplan/dbengine.api',
                dataType: 'json',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                data: {query : query},
                success: function( data, textStatus, jQxhr ){
			cbk(data.data.data); 
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });                
        },	
        submitQuery : function() {
	    var me = this;
		var query = false, cbk = false;
            $.ajax({
                url: '/api/platoplan/dbengine.api',
                dataType: 'json',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                data: {query : ((query) ? query : $('#SQL').val())},
                success: function( data, textStatus, jQxhr ){
		    if (typeof cbk === 'function') {
			   cbk(data.data); 
		    } else {
                    	me.result = data.data;
                    	me.setState({updated: new Date().getTime()});
		    }
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });                
        },
        render: function() {
        	var me = this;
                return  (<div className="container">
                          <div className="row mb-1 alert-success border">
                              <div className="col-sm-2"> 
				<div className="btn-group d-flex w-100 mt-2">
				  <button type="button" className="btn btn-info  w-100 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    Action 2
				  </button>
				  <div className="dropdown-menu">
				    <a className="dropdown-item" href="#">Action</a>
				    <a className="dropdown-item" href="#">Another action</a>
				  </div>
				</div>
                              </div>
                              <div className="col-sm-10">
				<nav className="navbar navbar-expand-sm">
				  <ul className="navbar-nav">
					{me.tables.map(
					function(item) {
						return (<li className="nav-item">
						<a className="nav-link" href="#">{item}</a>
						</li>)
					}
					)}  
				  </ul>
				</nav>     
                              </div>
                          </div>				
                          <div className="row alert-secondary">
                              <div className="col-sm-11 p-2">
                                   <textarea id="SQL" className="form-control" rows="3"></textarea>
                              </div>
                              <div className="col-sm-1 pt-4">
                                   <button className="btn btn-default border border-default" onClick={me.submitQuery.bind(me)} type="submit">submit</button>
                              </div> 
                          </div>
                           <div className="row alert-secondary">
                              <div className="col-sm-12  p-3">
				      [{JSON.stringify(me.result)}]
                              </div>
                          </div>
                                
                      </div>)
              }
})
