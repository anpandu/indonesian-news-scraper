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

var Kompas = function () {}


Kompas.prototype.baseURL = "http://news.kompas.com/"

Kompas.prototype.getBaseURL = function() {
  return Kompas.prototype.baseURL
}

Kompas.prototype.scrap = function() {
  return Promise.resolve()
    .then(Kompas.prototype.getBaseURL)
    .then(request)
    .then(Kompas.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Kompas.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

Kompas.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)             
  var urls = $('div.kcm-idx-channel ul li')
    .map(function (index, item) {
      return $(item).find('div.list-latest a').attr('href')
    })
    .get()
  return urls
}

Kompas.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Kompas.prototype.getURL($)
  var title = Kompas.prototype.getTitle($)
  var date = Kompas.prototype.getDate($)
  var img = Kompas.prototype.getImg($)
  var summary = Kompas.prototype.getSummary($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'summary': summary
  }
  return result
}

Kompas.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

Kompas.prototype.getTitle = function($) {
  return $('div.kcm-read div.kcm-read-top h2').text()
}

Kompas.prototype.getDate = function($) {
  var date = $('div.kcm-read div.msmall.grey.mb2').text()
  date = date.replace('WIB', '').replace(',', '').replace('|', '')
  return date
}

Kompas.prototype.getImg = function($) {
  return $('div.kcm-read div.photo img').attr('src')
}

Kompas.prototype.getSummary = function($) {
  $('div.kcm-read div.photo').find('img').remove()
  $('div.kcm-read div.photo').find('span').remove()
  var summary = $('div.kcm-read div.photo').text()
  summary = summary.substring(1)
  return summary
}

module.exports = new Kompas ()