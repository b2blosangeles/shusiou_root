var _compView = function(me, Root) {
	this.test = function() {
		return (<span>	
		<button type="button" className="btn btn-info" onClick={me.compData.loadVideos.bind(me)}>Load Data</button>
		&nbsp;
		<button type="button" className="btn btn-info" onClick={Root.overLay.popup.bind(me, popupSetting)}>Popup Window</button>
		</span>)
	}
};
