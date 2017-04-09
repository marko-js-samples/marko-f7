var template = require('marko').load(require.resolve('./template.marko'));
function get(req, res) {
    template.render({}, res);
}
exports.get = get;
;
