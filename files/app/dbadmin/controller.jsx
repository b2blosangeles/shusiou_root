React.createClass({
        getInitialState: function() {
	        var me = this;
                me.result = {};
		me.tables = [];
		me.callQuery('SHOW TABLES', me.showTables);
	        return {}    
        },
       showTables : function(data) {
	    var me = this; 
	    mr.tables = [];
	    console.log(data);
	       
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
			cbk(data.data); 
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
                return  (<div className="container px-1">
                          <div className="row">
                              <div className="col-sm-1">
                                Tables<hr/>
                              </div>
                              <div className="col-sm-10">
                                   <textarea id="SQL" className="form-control" rows="3"></textarea>
                                   <hr/>
                                   [{JSON.stringify(me.result)}]
                                      
                              </div>
                              <div className="col-sm-1">
                                   <button className="btn btn-default border border-default" onClick={me.submitQuery.bind(me)} type="submit">submit</button>
                              </div> 
                          </div>
                           <div className="row">
                              <div className="col-sm-3">
                              </div>
                              <div className="col-sm-9">
                              </div>
                          </div>
                                
                      </div>)
              }
})
