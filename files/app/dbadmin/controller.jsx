React.createClass({
        sendQuery : function() {
                console.log($('#SQL').val());
            $.ajax({
                url: '/api/platoplan/dbengine.api',
                dataType: 'json',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                data: {query : $('#SQL').val()},
                success: function( data, textStatus, jQxhr ){
                    console.log(data);
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
                              </div>
                              <div className="col-sm-1">
                                   <button className="btn btn-default border border-default" onClick={me.sendQuery.bind(me)} type="submit">submit</button>
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
