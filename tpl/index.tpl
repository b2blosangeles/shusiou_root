<!DOCTYPE html>
<html>
<head>
    <title>速修语言</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="{$master}/js/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="{$master}/package/qalet_plugin.css?plus=lang_space">
	<script src="{$master}/package/qalet_plugin.js?plus=lang_space"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"></script>
	<script src="{$master}/js/shusiou_socket.js"></script>
	<!--script src="//cdnjs.cloudflare.com/ajax/l/ibs/annyang/2.6.0/annyang.min.js"></script-->	
	<script>
		var _dns = {$dns},
		_master_svr = function() { 
			return _dns.master[Math.floor(Math.random() * _dns.master.length)];
		},
		_node_svr = function() { 
			return _dns.node[Math.floor(Math.random() * _dns.node.length)];
		};
	</script>
</head>
<body>
	<!--span class="class_lang_space  lang_space_plugin"></span-->	
</body>
</html>
