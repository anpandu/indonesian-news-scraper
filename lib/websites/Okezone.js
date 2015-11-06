/*! news-scrapper v1.4.0 - MIT license */

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

var Okezone = function () {}


Okezone.prototype.baseURL = 'http://www.okezone.com/'

Okezone.prototype.getBaseURL = function() {
  return Okezone.prototype.baseURL
}

Okezone.prototype.scrap = function() {
  return Promise.resolve()
    .then(Okezone.prototype.getBaseURL)
    .then(request)
    .then(Okezone.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Okezone.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

Okezone.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('div#area ul li div div h3')
    .map(function (index, item) {
      var url = $(item).find('a').attr('href')
      return url
    })
    .get()
  return urls
}

Okezone.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Okezone.prototype.getURL($)
  var title = Okezone.prototype.getTitle($)
  var date = Okezone.prototype.getDate($)
  var img = Okezone.prototype.getImg($)
  var content = Okezone.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content
  } 
  return result
}

Okezone.prototype.getURL = function($) {
  var url = undefined
  url = (_.isUndefined(url)) ? $('meta[property="og:url"]').attr('content') : url;
  url = (_.isUndefined(url)) ? $('link[rel=canonical]').attr('href') : url;
  return url
}

Okezone.prototype.getTitle = function($) {
  var title = undefined
  title = (_.isUndefined(title)) ? $('div.titles h1').text() : title
  title = (_.isUndefined(title)) ? $('div.news-home div.titles').text() : title
  return title
}

Okezone.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('time.tgl').text() : date
  date = (_.isUndefined(date)) ? $('div.news-home time.tgl').text() : date
  // date = date.replace('wib', '').replace(',', '').replace('|', '').replace(/(\n|\t)+/g, '')
  return date
}

Okezone.prototype.getImg = function($) {
  var img = undefined
  img = (_.isUndefined(img)) ? $('div.news-home img#imgCheck').attr('src') : img
  img = (_.isUndefined(img)) ? $('link[rel=image_src]').attr('href') : img;
  return img
}

Okezone.prototype.getContent = function($) {
  var content = undefined
  $('div.news-home div#contentx').find('script').remove()
  content = (_.isUndefined(content)) ? $('div.news-home div#contentx').text() : content
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\n|\t|\r)+/g, ' ')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new Okezone ()