var video = (req.query.vid) ? req.query.vid : 'video_1553034704';
var section = (req.query.section) ? req.query.section : '6';

res.sendFile('/var/mobileCloud/250885B4-CE64-46EA-BAE3-8BCE39971E03/tmp/' + video + '/' + section + '.mp4')
