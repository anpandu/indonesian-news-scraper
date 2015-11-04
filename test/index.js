'use strict';

var _ = require('lodash');
var assert = require('assert');
var index = require('../lib');

describe('news-scrapper', function () {

  it('should contains TempoEnglish scrapper', function () {
    assert(!_.isUndefined(index.TempoEnglish), 'TempoEnglish scrapper not found')
  })

  it('should contains Kompas scrapper', function () {
    assert(!_.isUndefined(index.Kompas), 'Kompas scrapper not found')
  })

})
