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


var Antara = function () {}

Antara.prototype.source = 'Antara'
Antara.prototype.baseURL = 'http://www.antaranews.com/rss/news.xml'

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Antara.prototype.getBaseURL = function() {
  return Antara.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Antara.prototype.scrap = function() {
  return Promise.resolve()
    .then(Antara.prototype.getBaseURL)
    .then(request)
    .then(Antara.prototype.getURLsFromMainPage)
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
            .then(Antara.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error('['+Antara.prototype.source+'] ['+e.name+' - '+e.message.replace(/(\n|\r)/g,'').slice(0,32)+' ...] '+url)
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
Antara.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Antara.prototype.getBaseURL)
    .then(request)
    .then(Antara.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
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

/**
 * Get all data from scraped single page.
 * @param {string} scrap - String scraped from single page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
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
    'content': content,
    'source': Antara.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Antara.prototype.getURL = function($) {
  var url = ''
  url = (_.isEmpty(url)) ? $('div.bjbrt a[itemprop=url]').attr('href') : url
  url = (_.isEmpty(url)) ? $('fb\\:comments').attr('href') : url
  return url
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Antara.prototype.getTitle = function($) {
  var title = ''
  title = (_.isEmpty(title)) ? $('div.bjbrt h1[itemprop=headline]').text() : title
  title = (_.isEmpty(title)) ? $('meta[property="og:title"]').attr('content') : title
  title = title.replace(/(\r|\n|\t)*/g, '')
  return title
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Antara.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('meta[name=pubdate]').attr('content') : date
  date = (_.isUndefined(date)) ? $('meta[itemprop=datePublished]').attr('content') : date
  if (_.isUndefined(date)) {
    date =  $('div.bjbrt div.date.mt10').text()
    date = date.replace(/Januari/g, 'Januari')
    date = date.replace(/February/g, 'February')
    date = date.replace(/Maret/g, 'March')
    date = date.replace(/Mei/g, 'May')
    date = date.replace(/Juni/g, 'June')
    date = date.replace(/Juli/g, 'July')
    date = date.replace(/Agustus/g, 'Mei')
    date = date.replace(/Oktober/g, 'October')
    date = date.replace(/Desember/g, 'December')
    var d = moment(date, 'DD MMMM YYYY HH:mm')
    date = d.toISOString()
  }
  var d = moment(date)
  return d.utc().valueOf()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Antara.prototype.getImg = function($) {
  var img = ''
  img = (_.isEmpty(img)) ? $('div#image_news img').attr('src') : img
  img = (_.isEmpty(img)) ? $('meta[property="og:image"]').attr('content') : img
  return img
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Antara.prototype.getContent = function($) {
  $('div#content_news').find('p.mt10').remove()
  $('div#content_news').find('p.date').remove()
  $('div#content_news').find('script').remove()
  $('div#content_news').find('i').remove()
  var content = $('div#content_news').text()
  content = Antara.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
Antara.prototype.cleanContent = function(content) {
  content = content.replace(/(\n|\t|\r)+/g, ' ')
  content = content.replace(/(\ |\ |\ |\ )+/g, ' ')
  content = content.replace(/(–|—|--)+/g, '-')
  content = content.replace(/”|“/g, '"')
  while (content.length > 0 && content[0].match(/( |-|,)/))
    content = content.substring(1)
  while (content.length > 0 && content[content.length-1]===' ')
    content = content.substring(0, content.length-1)
  return content
}

module.exports = new Antara ()