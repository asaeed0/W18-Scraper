const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* ----------------------------------------------------------
    SCHEMAS
---------------------------------------------------------- */

//  Meta Data Schema
const meta = {
    data: {
        type: 'string',
    },
    nyTimes: {
        type: 'string'
    },
    dawn: {
        type: 'string'
    },
    cbc: {
        type: 'string'
    },
};

//  News Article Schema - Identical for all News Outlets
const articleSchema = {
    headline: {
        type: 'string',
    },
    url: {
        type: 'string',
    },
    outlet: {
        type: 'string',
    },
    date: {
        type: 'string',
    },
    summary: {
        type: 'string',
    },
    comments: {
        type: 'array',
        default: [],
    },
    article: {
        type: 'string',
    },
};


/* ----------------------------------------------------------
    SCHEMAS & MODEL CONSTRUCTION
---------------------------------------------------------- */


//  Schema Constructors
const nyTimesSchema = new Schema(articleSchema, { collection: 'nyTimes' });
//  const dawnSchema = new Schema(articleSchema, { collection: 'dawn' });
//  const cbcSchema = new Schema(articleSchema, { collection: 'cbc' });
const metaSchema = new Schema(meta, { collection: 'meta' });

//  Model Constructors
const ArticleNyTimes = mongoose.model('Article', nyTimesSchema);
//  const ArticleDawn = mongoose.model('Article', dawnSchema);
//  const ArticleCbc = mongoose.model('Article', cbcSchema);
const Meta = mongoose.model('Meta', metaSchema);


module.exports = {
    ArticleNyTimes: ArticleNyTimes,
    // ArticleDawn: ArticleDawn,
    // ArticleCbc: ArticleCbc,
    Meta: Meta,
};