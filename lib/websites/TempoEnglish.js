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


TempoEnglish.prototype.getTitle = function(selector) {
  return selector.find('h2').text();
}

TempoEnglish.prototype.getDate = function(selector) {
  var date = selector.find(".tanggal").text()
  date = date.replace('WIB', '').replace(',', '').replace('|', '')
  return date
}

TempoEnglish.prototype.getURL = function(selector) {
  return 'http://en.tempo.co' + selector.find('h2 a').attr('href')
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

TempoEnglish.prototype.getDataFromScrap = function(scrap) {
  var $ = cheerio.load(scrap)             
  var promises = $('ul.indeks-list li')
    .map(function (index, item) {   
      var url = TempoEnglish.prototype.getURL($(item))
      var title = TempoEnglish.prototype.getTitle($(item))
      var date = TempoEnglish.prototype.getDate($(item))
      return request(url)
        .then( function (newsdetails) {
          var $ = cheerio.load(newsdetails)
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
        })
    })
    .get()
  return Promise.all(promises)
}

TempoEnglish.prototype.scrap = function() {
  return request('http://en.tempo.co/index')
    .then( function (scrap) {        
      var promises = TempoEnglish.prototype.getDataFromScrap(scrap)
      return Promise.all(promises)
    })
}

module.exports = new TempoEnglish ()