React.createClass({
        getInitialState: function() {
		var me = this;
                if  (localStorage.getItem('_auth')) {
                        window.location.href='#/';
                }
		return {}
        },        
        sendFrom : function () {
          var me = this;
          return  (<div className="container">
			<div className="row">
				<div className="col-sm-12 p-5 text-center">
					<h5>Use iphone to scan the QR code to start registration</h5>
					<img src="http://dev.platoplan.com/api/platoplan/qr.api" className="mt-5"/>
				</div>	  
			</div>	  
            	</div>)        
        },
        render: function() {
                var me = this;
                return Root.commUI.show({
                                code: 'infoBox', 
                                parent : me, 
                                data : me.sendFrom(), 
                                setting : {
                                        type : 'light',
                                        noshadow : true,
                                        style : {'min-height' : '40em'},
                                        class : 'documentPageBody p-3'
                                  }
                        })
        }
})
