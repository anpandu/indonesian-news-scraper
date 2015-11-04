/*! news-scrapper v0.0.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var request = require('request-promise')
var cheerio = require('cheerio')
var Promise = require('bluebird')

/**
 * @param {}
 * @return {}
 * @api public
 */

var TempoEnglish = function () {}


TempoEnglish.prototype.baseURL = "http://en.tempo.co/index"

TempoEnglish.prototype.getBaseURL = function() {
  return TempoEnglish.prototype.baseURL
}

TempoEnglish.prototype.scrap = function() {
  return Promise.resolve()
    .then(TempoEnglish.prototype.getBaseURL)
    .then(request)
    .then(TempoEnglish.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(TempoEnglish.prototype.getDataFromSinglePage)
        })
      return Promise.all(promises)
    })
}

TempoEnglish.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)             
  var urls = $('ul.indeks-list li')
    .map(function (index, item) {
      return 'http://en.tempo.co' + $(item).find('h2 a').attr('href')
    })
    .get()
  return urls
}

TempoEnglish.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = TempoEnglish.prototype.getURL($)
  var title = TempoEnglish.prototype.getTitle($)
  var date = TempoEnglish.prototype.getDate($)
  var img = TempoEnglish.prototype.getImg($)
  var summary = TempoEnglish.prototype.getSummary($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'summary': summary
  }
  return result
}

TempoEnglish.prototype.getURL = function($) {
  return $('link[rel=canonical]').attr('href')
}

TempoEnglish.prototype.getTitle = function($) {
  return $('div.judul-konten').text()
}

TempoEnglish.prototype.getDate = function($) {
  var date = $('div.kolom-2-kolom div.tanggal').text()
  date = date.replace('WIB', '').replace(',', '').replace('|', '')
  return date
}

TempoEnglish.prototype.getImg = function($) {
  return $('div.foto-konten img').attr('src')
}

TempoEnglish.prototype.getSummary = function($) {
  $('div.tubuh-berita p:first-child').find('strong').remove()
  var summary = $('div.tubuh-berita p:first-child').text()
  summary = summary.replace(/,\s*-\s*/, '')
  return summary
}

module.exports = new TempoEnglish ()