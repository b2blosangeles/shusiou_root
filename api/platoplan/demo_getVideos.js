let list = [],
    dirn = env.root_path + '/demo_videos';

pkg.fs.readdir(dirn, (err, files) => {
    files.forEach(file => {
        list.push(file);
    });
    res.send(list);
});
