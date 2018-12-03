var _compView = function(me, Root) {
	this.showVideoMenu = function() {
		var popupSetting = {
			type : 'light', 
			// style : {'min-height' : '12em', 'border' : '3px solid #666 !important'},
			closeIcon : true,
			data : (<span>
				<button type="button" className="btn btn-warning"  
					onClick={Root.overLay.closePopup.bind(me)}>close Popup Window</button>
				</span>
				)
		};
		return (<span>	
		<button type="button" className="btn btn-info" onClick={me.compData.loadVideos.bind(me)}>Load Data</button>
		&nbsp;
		<button type="button" className="btn btn-info" onClick={Root.overLay.popup.bind(me, popupSetting)}>Popup Window</button>
		</span>)
	}
};
