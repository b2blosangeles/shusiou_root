let list = [],
    dirn = env.root_path + '/demo_videos';

var CP = new pkg.crowdProcess();

var fn = 'HEATING_JACKET.mp4';

pkg.fs.readdir(dirn, (err, files) => {
    files.forEach(file => {
        if (/\.mp4$/.test(file)) {
            list.push(file);
        }
    });
    res.send(list);
});
