const http = require('http');
const ical = require('ical-generator');

module.exports.createAndSendTagelerICal = (tageler, res) => {
    let cal = ical({domain: 'Pfadi Patria',
                    name: 'Pfadi Patria Events'
    });

    cal.createEvent({
        start: tageler.start,
        end: tageler.end,
        summary: 'Pfadi Event',
        description: tageler.text
    });

    cal.serve(res);
};

module.exports.createTagelerICal = (tageler, callback) => {
    try {
        let cal = ical({
            domain: 'Pfadi Patria',
            name: tageler.title
        });

        cal.createEvent({
            start: tageler.start,
            end: tageler.end,
            summary: tageler.title,
            description: tageler.text
        });
        callback(null, cal.toString());
    } catch(err){
        callback(err);
    }
};


module.exports.createGroupICal = (group, tagelers, callback) => {
    try {
        let cal = ical({
            domain: 'Pfadi Patria',
            name: group + ' Tageler'
        });

        for (i = 0; i < tagelers.length; i++) {
            cal.createEvent({
                start: tagelers[i].start,
                end: tagelers[i].end,
                summary: tagelers[i].title,
                description: tagelers[i].text
            });
        }
        callback(null, cal.toString());
    } catch(err){
        callback(err);
    }
};

/*this.serve = function(response, filename) {
 response.writeHead(200, {
 'Content-Type': 'text/calendar; charset=utf-8',
 'Content-Disposition': 'attachment; filename="' + (filename || 'calendar.ics') + '"'
 });
 response.end(generate(this));

 return this;
 };
*/
