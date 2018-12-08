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
	};
	this.showVideos = function () {
		return  (
			<div className="container">BBBB
				{Root.lib.spinAnchor(me, 'AA')}
				<div className="row ">
					<div className="col-sm-12 p-1">	
					{Root.commUI.show({
							code: 'infoBox', 
							parent : me, 
							data : me.compView.showVideoMenu(), 
							setting : {
								class : ' alert-secondary text-right ',
								noshadow :  true,
								rounded : true,
								style : {'min-height' : '2em'}
							}
						})}
					</div>
				</div>
				<div className="row mt-2">				
					{me.list.map(function(m) {
					return (<div className="col-sm-3 p-1">
						{Root.commUI.show({
							code: 'infoBox', 
							parent : me, 
							data : me.compData.showImage(m), 
							setting : {
								noshadow :false,
								type: 'light',
								style : {'min-height' : '9em'}
							}
						})}
						</div>)
					})}							
				</div>
			</div>)	
	}
	this.showMyinventions = function () {
		return  (
			<div className="container">AAAA
				{Root.lib.spinAnchor(me, 'AB')}
				<div className="row ">
					<div className="col-sm-12 p-1">	
					{Root.commUI.show({
							code: 'infoBox', 
							parent : me, 
							data : me.compView.showVideoMenu(), 
							setting : {
								class : ' alert-secondary text-right ',
								noshadow :  true,
								rounded : true,
								style : {'min-height' : '2em'}
							}
						})}
					</div>
				</div>
				<div className="row mt-2">				
					{me.list.map(function(m) {
					return (<div className="col-sm-3 p-1">
						{Root.commUI.show({
							code: 'infoBox', 
							parent : me, 
							data : me.compData.showImage(m), 
							setting : {
								noshadow :false,
								type: 'light',
								style : {'min-height' : '9em'}
							}
						})}
						</div>)
					})}							
				</div>
			</div>)	
	}
};
