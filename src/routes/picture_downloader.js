// var fs = require('fs');
// var request = require('request');
// var progress = require('request-progress');

// const PictureDownload = module.exports = function (uri, path, onProgress, onResponse, onError, onEnd) {
//     progress(request(uri))
//     .on('progress', onProgress)
//     .on('response', onResponse)
//     .on('error', onError)
//     .on('end', onEnd)
//     .pipe(fs.createWriteStream(path))
// };

// var http = require('http');
// var fs = require('fs');

// const PictureDownload = module.exports =  function(url, dest, cb) {
//   var file = fs.createWriteStream(dest);
//   var request = http.get(url, function(response) {
//     response.pipe(file);
//     file.on('finish', function() {
//       file.close(cb);  // close() is async, call cb after close completes.
//     });
//   });
// }


// const image_downloader = require('image-downloader');
// const PictureDownload = module.exports =  function(url, dest, cb) {
//   var options = {
//     url: url,
//     dest: dest,
//     done: function(err,filename,image){
//       if (err){
//         console.log("error in imgDowner "+ err);
//       }
//       console.log('File saved to', filename);
//       cb();
//     }
//   };
//   image_downloader(options);
// }

// const downloadImage = require('download-image')

const crawler = require('img-crawler');
const PictureDownload  = (url, dest) => {
    const opts = {
        url: url,
        dist: dest
    };
    crawler.crawl(opts, (err, data) => {
        console.log('Downloaded %d from %s', data.imgs.length, opts.url);
    });
};
module.exports = PictureDownload;
// downloadImage('lorempixel.com/g/400/200/', `./image2.jpg`);