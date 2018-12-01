var loadVideos = function(me, Root) {
	var spin_id = Root.overLay.spinOn();
	me.list = [];
	me.setState({updated : new Date().getTime()});
	setTimeout(
		function() {
			me.list = Root.lib.getNumberList(18);
			Root.overLay.spinOff(spin_id);
			me.setState({updated : new Date().getTime()});
		},1000
	)
}
var showImage = function() {

	return '<img src="https://i.ytimg.com/an_webp/vjhiERkfvG4/mqdefault_6s.webp?du=3000&sqp=CK7xh-AF&rs=AOn4CLCo8EFruYbRz8rnnQ8RZua389qa2Q"/>';
}
