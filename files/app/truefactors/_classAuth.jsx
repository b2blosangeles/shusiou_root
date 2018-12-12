React.createClass({
	/* --- this version do setInterval only need, no ever last setInterval */
	getInitialState: function() {
		var me = this;
		return {_auth :  localStorage.getItem('_auth'), info:'b2blosangeles'};
	},
	componentDidMount : function() {
		var me = this;
		window.__rootAuth = me;
	},
	componentDidUpdate : function(prevProps, prevState) {
		var me = this;
		if (prevState._auth !== me.state._auth) {
			location.reload();
		}
	},
	signInAuth : function(Root) {
		var me = this;
		Root.overLay.closePopup(Root);
		setTimeout(me.doAuth, 1000);
	},
	registration : function() {
		alert('registration');
	},
	signIn : function(Root) {
		var me = this;
		var popupSetting = {
			type : 'light', 
			// style : {'min-height' : '12em', 'border' : '3px solid #666 !important'},
			closeIcon : true,
			data : (
				 <div className="container">
				    <div className="row">
				      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div class="card card-signin my-5">
					  <div className="card-body">
					    <h5 className="card-title text-center">Sign In</h5>
					    <form className="form-signin">
					      <div className="form-label-group mb-3">
						<input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
					      </div>

					      <div className="form-label-group mb-3">
						<input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
					      </div>

					      <button className="btn btn-lg btn-primary btn-block text-uppercase" 
						      onClick={me.signInAuth.bind(me, Root)}
						      type="button">Sign in</button>
						    
					      <button className="btn btn-lg btn-primary btn-block text-uppercase" 
						      onClick={me.registration.bind(me, Root)}
						      type="button">Registration</button>
					    </form>
					  </div>
					</div>
				      </div>
				    </div>
				  </div>)
		};
		Root.overLay.popup(popupSetting);		
	},	
	doAuth : function() {
		/*<span>
				<button type="button" className="btn btn-success"  
					onClick={me.signInAuth.bind(me, Root)}>Sign In</button>
				</span>*/
		
		
		var me = this;
		var v = (me.state._auth) ? '' : new Date().getTime();
		localStorage.setItem('_auth', v);
		me.setState({_auth : v});
	},	
	render: function() {
		var me = this;
		return (<span></span>)                   
	}
})
