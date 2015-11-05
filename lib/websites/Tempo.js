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

var Tempo = function () {}


Tempo.prototype.baseURL = "http://tempo.co/"

Tempo.prototype.getBaseURL = function() {
  return Tempo.prototype.baseURL
}

Tempo.prototype.scrap = function() {
  return Promise.resolve()
    .then(Tempo.prototype.getBaseURL)
    .then(request)
    .then(Tempo.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Tempo.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

Tempo.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('ul.list-terkini li div.box-text h3')
    .map(function (index, item) {
      return $(item).find('a').attr('href')
    })
    .get()
  return urls
}

Tempo.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Tempo.prototype.getURL($)
  var title = Tempo.prototype.getTitle($)
  var date = Tempo.prototype.getDate($)
  var img = Tempo.prototype.getImg($)
  var summary = Tempo.prototype.getSummary($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'summary': summary
  } 
  return result
}

Tempo.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

Tempo.prototype.getTitle = function($) {
  return $('div.artikel h1').text().replace(/(\n|\t)*/g, '')
}

Tempo.prototype.getDate = function($) {
  var date = $('div.artikel div.block-tanggal').text().replace(/(\n|\t)*/g, '')
  date = date.replace('WIB', '').replace(',', '').replace('|', '')
  return date
}

Tempo.prototype.getImg = function($) {
  return $('div.artikel div.single-img img').attr('src')
}

Tempo.prototype.getSummary = function($) {
  var summary = $('div.artikel p').text()
  summary = summary.replace(/(\ \ +)/g, ' ')
  return summary
}

module.exports = new Tempo ()