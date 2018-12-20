React.createClass({
        getInitialState: function() {
		var me = this;
                if  (localStorage.getItem('_auth')) {
                        window.location.href='#/';
                }
		return {}
        },        
        sendLoginFrom : function () {
          var me = this;
	  var url = '/api/platoplan/QR_auth.api?uuid=' + localStorage.getItem('UUID') + '&type=signin' +
	       '&tm=' + new Date().getTime();
          return  (<div className="container">
			<div className="row">
				<div className="col-sm-12 p-5 text-center">
					<h5>Use iphone to scan the QR code to login</h5>
					<img src={url} className="mt-3"/>
				</div>	  
			</div>	  
            	</div>)        
        },
        sendRegistrationFrom : function () {
          var me = this;
	   var url = '/api/platoplan/QR_auth.api?uuid=' + localStorage.getItem('UUID') + '&type=registration' +
	       '&tm=' + new Date().getTime();
          return  (<div className="container">
			<div className="row">
				<div className="col-sm-12 p-5 text-center">
					<h5>Use iphone to scan the QR code to do registration</h5>
					<img src={url} className="mt-3"/>
				</div>	  
			</div>	  
            	</div>)        
        },	
        render: function() {
                var me = this;
		var menuItem = (!me.props.data) ? 'homePage' : me.props.data;
                return Root.commUI.show({
                                code: 'infoBox', 
                                parent : me, 
                                data : (menuItem == 'login') ? me.sendLoginFrom() : me.sendRegistrationFrom() , 
                                setting : {
                                        type : 'light',
                                        noshadow : true,
                                        style : {'min-height' : '40em'},
                                        class : 'documentPageBody p-3'
                                  }
                        })
        }
})
