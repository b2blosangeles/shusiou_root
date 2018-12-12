var _compView = function(me, Root) {
	this.showVideoMenu = function() {
		return (<span>	
		<button type="button" className="btn btn-info" onClick={me.compData.loadVideos.bind(me)}>Load Data</button>
		</span>)
	};
	this.showVideos = function () {
		return  (
			<div className="container">
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
							data : me.compView.showImage(m), 
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
			<div className="container">
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
							data : me.compView.showImage(m), 
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
	this.showImage = function(i) {
		var list = [
			'/app/truefactors/resource/webp/mqdefault_6s.webp',
			'/app/truefactors/resource/webp/100.webp',
			'/app/truefactors/resource/webp/101.webp',
			'/app/truefactors/resource/webp/102.webp',
			'/app/truefactors/resource/webp/103.webp',
			'/app/truefactors/resource/webp/104.webp',
			'/app/truefactors/resource/webp/105.webp',
			'/app/truefactors/resource/webp/106.webp',
			'/app/truefactors/resource/webp/107.webp',
			'/app/truefactors/resource/webp/108.webp',
			'/app/truefactors/resource/webp/109.webp',
			'/app/truefactors/resource/webp/110.webp',
			'/app/truefactors/resource/webp/111.webp',
			'/app/truefactors/resource/webp/112.webp',
			'/app/truefactors/resource/webp/113.webp',
			'/app/truefactors/resource/webp/114.webp',
			'/app/truefactors/resource/webp/115.webp',
			'/app/truefactors/resource/webp/116.webp',
			'/app/truefactors/resource/webp/117.webp'
		]
		
		var item = list[Math.floor(Math.random()*list.length)];
		var url = (list[i]) ? list[i] : item;
		var popupSetting = {
			type : 'light', 
			// style : {'min-height' : '12em', 'border' : '3px solid #666 !important'},
			closeIcon : true,
			data : (<span>
				<img className="w-100" src={url}/>
					
				<button type="button" className="btn btn-warning"  
					onClick={Root.overLay.closePopup.bind(me)}>close Popup Window</button>
				</span>
				)
		};
		return (<img className="w-100" 
				onClick={Root.overLay.popup.bind(me, popupSetting)}
				src={url}/>);
	}	
};
