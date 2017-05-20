const ical = require('ical-generator');


module.exports.createTagelerICal = (tageler, callback) => {
    try {
        let cal = ical({});

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

