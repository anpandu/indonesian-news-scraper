/*! news-scrapper v2.0.0 - MIT license */

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

var Antara = function () {}


Antara.prototype.baseURL = 'http://www.antaranews.com/rss/news.xml'

Antara.prototype.getBaseURL = function() {
  return Antara.prototype.baseURL
}

Antara.prototype.scrap = function() {
  return Promise.resolve()
    .then(Antara.prototype.getBaseURL)
    .then(request)
    .then(Antara.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Antara.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

Antara.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('rss channel item')
    .map(function (index, item) {
      $(item).find('title').remove()
      $(item).find('description').remove()
      $(item).find('enclosure').remove()
      $(item).find('pubdate').remove()
      $(item).find('guid').remove()
      var url = $(item).text()
      url = url.replace(/(\n|\ )+/g, '')
      return url
    })
    .get()
  return urls
}

Antara.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Antara.prototype.getURL($)
  var title = Antara.prototype.getTitle($)
  var date = Antara.prototype.getDate($)
  var img = Antara.prototype.getImg($)
  var content = Antara.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content
  } 
  return result
}

Antara.prototype.getURL = function($) {
  return $('div.bjbrt a[itemprop=url]').attr('href')
}

Antara.prototype.getTitle = function($) {
  return $('div.bjbrt h1[itemprop=headline]').text()
}

Antara.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('meta[name=pubdate]').attr('content') : date
  date = (_.isUndefined(date)) ? $('meta[itemprop=datePublished]').attr('content') : date
  date = (_.isUndefined(date)) ? $('div.bjbrt div.date.mt10').text() : date
  return date
}

Antara.prototype.getImg = function($) {
  return $('div#image_news img').attr('src')
}

Antara.prototype.getContent = function($) {
  $('div#content_news').find('p').remove()
  $('div#content_news').find('script').remove()
  $('div#content_news').find('div').remove()
  var content = $('div#content_news').text()
  content = content.replace(/(\n|\t|\r)+/g, ' ')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new Antara ()