import * as express from "express"
var template = require('marko').load(require.resolve('./template.marko'));

    export function get(req:express.Request, res:express.Response) {
        template.render({},res)

    };