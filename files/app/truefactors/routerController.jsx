React.createClass({
	/* --- this version do setInterval only need, no ever last setInterval */
	render: function() {
		var me = this;
		return (<span>
				{me.showSpinner()}
				{me.showPopup()}
			</span>)                   
	}
})
