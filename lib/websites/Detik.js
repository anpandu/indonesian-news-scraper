/*! indonesian-news-scraper v2.4.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var request = require('request-promise')
var cheerio = require('cheerio')
var Promise = require('bluebird')
var moment = require('moment')


var Detik = function () {}

Detik.prototype.source = 'Detik'
Detik.prototype.baseURL = "http://rss.detik.com/index.php"

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Detik.prototype.getBaseURL = function() {
  return Detik.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Detik.prototype.scrap = function() {
  return Promise.resolve()
    .then(Detik.prototype.getBaseURL)
    .then(request)
    .then(Detik.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {
              var options = {
                uri: url,
                headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36' },
                json: true
              }
              return options
            })
            .then(request)
            .then(Detik.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error('['+Detik.prototype.source+'] ['+e.name+' - '+e.message.replace(/(\n|\r)/g,'').slice(0,32)+' ...] '+url)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

/**
 * Get all single page URLs from main page.
 * @param {}
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Detik.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Detik.prototype.getBaseURL)
    .then(request)
    .then(Detik.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Detik.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('rss channel item')
    .map(function (index, item) {
      var url = $(item)
        .contents()
        .filter(function () { return (this.type === 'text') })
        .map(function () { return $(this).text().trim() })
        .filter(function () { return this != '' })
        .get()[0]
      url = url.replace(/\n/g, '')
      return url
    })
    .get()
  return urls
}

/**
 * Get all data from scraped single page.
 * @param {string} scrap - String scraped from single page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Detik.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Detik.prototype.getURL($)
  var title = Detik.prototype.getTitle($)
  var date = Detik.prototype.getDate($)
  var img = Detik.prototype.getImg($)
  var content = Detik.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Detik.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Detik.prototype.getURL = function($) {
  var url = undefined
  url = (_.isUndefined(url)) ? $('meta[property="og:url"]').attr('content') : url
  url = url.replace(/\?.+/, '')
  return url
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Detik.prototype.getTitle = function($) {
  var title = undefined
  title = (_.isUndefined(title)) ? $('meta[property="og:title"]').attr('content') : title
  title = (_.isUndefined(title)) ? $('div.content_detail h1').text() : title
  title = title.replace(/(\r|\n|\t)*/g, '')
  title = title.trim()
  return title
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Detik.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('meta[name=pubdate]').attr('content') : date
  date = (_.isUndefined(date)) ? $('div.content_detail div.date').text() : date
  var d = moment(date, 'YYYY-MM-DDTHH-mm-ss')
  return d.utc().valueOf()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Detik.prototype.getImg = function($) {
  var img = undefined
  img = (_.isUndefined(img)) ? $('meta[property="og:image"]').attr('content') : img
  img = (_.isUndefined(img)) ? $('div.content_detail img').attr('src') : img
  img = (_.isUndefined(img)) ? $('div.pic_artikel img').attr('src') : img
  img = (_.isUndefined(img)) ? $('div.detail_text img').attr('src') : img
  return img
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Detik.prototype.getContent = function($) {
  var arr = [
    'div.text_detail',
    'div.detail_text',
    'div#bigpic',
    'div.content_detail div div.text_gal'
  ]
  arr.forEach(function (e) {
    var innerHTML = $(e).html()
    if (!_.isEmpty(innerHTML))
      $(e).html(innerHTML.replace('<br>', '\n'))
  })
  var content = undefined
  var selector = undefined
  if (!_.isNull($('div.text_detail').html()) && _.isUndefined(selector))
    selector = $('div.text_detail')
  if (!_.isNull($('div.detail_text').html()) && _.isUndefined(selector))
    selector = $('div.detail_text')
  if (!_.isNull($('div#bigpic').html()) && _.isUndefined(selector))
    selector = $('div#bigpic')
  if (!_.isNull($('div.content_detail div div.text_gal').html()) && _.isUndefined(selector))
    selector = $('div.content_detail div div.text_gal')
  selector.find('b').remove()
  selector.find('script').remove()
  selector.filter(function() { return this.type === 'comment'; }).remove();
  selector.html(selector.html().replace(/(\<[^<>]*\>)/g, ' $1'))
  content = (_.isUndefined(content)) ? selector.text() : content
  content = Detik.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
Detik.prototype.cleanContent = function(content) {
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\t)+/g, ' ')
  content = content.replace(/(\ ?\n ?|\ ?\r ?)+/g, '\n')
  content = content.replace(/(\ |\ |\ |\ )+/g, ' ')
  content = content.replace(/(–|—|--)+/g, '-')
  content = content.replace(/”|“/g, '"')
  while (content.length > 0 && content[0].match(/( |-|,)/))
    content = content.substring(1)
  while (content.length > 0 && content[content.length-1]===' ')
    content = content.substring(0, content.length-1)
  content = content.replace(/(\ ?\n ?|\ ?\r ?)+/g, '\n')
  content = content.trim()
  return content
}

module.exports = new Detik ()