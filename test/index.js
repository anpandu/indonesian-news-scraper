'use strict';

var _ = require('lodash');
var assert = require('assert');
var index = require('../lib');

describe('indonesian-news-scrapper', function () {

  it('should contains TempoEnglish scrapper', function () {
    assert(!_.isUndefined(index.TempoEnglish), 'TempoEnglish scrapper not found')
  })

  it('should contains Kompas scrapper', function () {
    assert(!_.isUndefined(index.Kompas), 'Kompas scrapper not found')
  })

  it('should contains Detik scrapper', function () {
    assert(!_.isUndefined(index.Detik), 'Detik scrapper not found')
  })

  it('should contains Tempo scrapper', function () {
    assert(!_.isUndefined(index.Tempo), 'Tempo scrapper not found')
  })

  it('should contains KapanLagi scrapper', function () {
    assert(!_.isUndefined(index.KapanLagi), 'KapanLagi scrapper not found')
  })

  it('should contains Antara scrapper', function () {
    assert(!_.isUndefined(index.Antara), 'Antara scrapper not found')
  })

  it('should contains Republika scrapper', function () {
    assert(!_.isUndefined(index.Republika), 'Republika scrapper not found')
  })

  it('should contains Okezone scrapper', function () {
    assert(!_.isUndefined(index.Okezone), 'Okezone scrapper not found')
  })

  it('should contains Liputan6 scrapper', function () {
    assert(!_.isUndefined(index.Liputan6), 'Liputan6 scrapper not found')
  })

})
