/*! indonesian-news-scraper v2.4.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var request = require('request-promise')
var cheerio = require('cheerio')
var moment = require('moment')
var Promise = require('bluebird')


var Liputan6 = function () {}

Liputan6.prototype.source = 'Liputan6'
Liputan6.prototype.baseURL = 'http://www.liputan6.com/indeks'

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Liputan6.prototype.getBaseURL = function() {
  return Liputan6.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Liputan6.prototype.scrap = function() {
  return Promise.resolve()
    .then(Liputan6.prototype.getBaseURL)
    .then(request)
    .then(Liputan6.prototype.getURLsFromMainPage)
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
            .then(Liputan6.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error('['+Liputan6.prototype.source+'] ['+e.name+' - '+e.message.replace(/(\n|\r)/g,'').slice(0,32)+' ...] '+url)
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
Liputan6.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Liputan6.prototype.getBaseURL)
    .then(request)
    .then(Liputan6.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Liputan6.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('div article aside header h4 a')
    .map(function (index, item) {
      var url = $(item).attr('href')
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
Liputan6.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Liputan6.prototype.getURL($)
  var title = Liputan6.prototype.getTitle($)
  var date = Liputan6.prototype.getDate($)
  var img = Liputan6.prototype.getImg($)
  var content = Liputan6.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Liputan6.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Liputan6.prototype.getURL = function($) {
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
Liputan6.prototype.getTitle = function($) {
  var title = $('meta[property="og:title"]').attr('content')
  title = title.replace(/(\r|\n|\t)*/g, '')
  title = title.trim()
  return title
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Liputan6.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('meta[name=pubdate]').attr('content') : date
  date = (_.isUndefined(date)) ? $('meta[itemprop=datePublished]').attr('content') : date
  date = (_.isUndefined(date)) ? $('div article header div p time').attr('datetime') : date

  date = date.replace(/Januari/g, 'Januari')
  date = date.replace(/February/g, 'February')
  date = date.replace(/Maret/g, 'March')
  date = date.replace(/Mei/g, 'May')
  date = date.replace(/Juni/g, 'June')
  date = date.replace(/Juli/g, 'July')
  date = date.replace(/Agustus/g, 'Mei')
  date = date.replace(/Oktober/g, 'October')
  date = date.replace(/Desember/g, 'December')
  
  var d = moment(date, 'YYYY-MM-DD HH:mm:ss').add(7, 'h')
  return d.utc().valueOf()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Liputan6.prototype.getImg = function($) {
  return $('meta[property="og:image"]').attr('content')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Liputan6.prototype.getContent = function($) {
  var arr = [
    'div article div div div#multi-page-0',
    'div article div figure figcaption',
    'div.article-content-body__item-content'
  ]
  arr.forEach(function (e) {
    var innerHTML = $(e).html()
    if (!_.isEmpty(innerHTML))
      $(e).html(innerHTML.replace('<br>', '\n'))
  })
  $('div article div div div#multi-page-0').find('b').remove()
  $('div article div div div#multi-page-0').find('div').remove()
  var content = $('div article div div div#multi-page-0').find('p')
    .map(function (index, element) {
      var text = $(this).text()
      return (text === 'Baca Juga') ? '' : text
    })
    .get()
    .join(' ')
  content = Liputan6.prototype.cleanContent(content)
  if (content === '') {
    content = $('div article div figure figcaption')
      .map(function (index, item) { return (item.children.length > 0) ? item.children[0].data : '' })
      .get()
      .join(' ') 
  }
  content = Liputan6.prototype.cleanContent(content)
  if (content === '') {
    content = $('div.article-content-body__item-content')
    .map(function (index, element) {
      var text = $(this).text()
      return (text === 'Baca Juga') ? '' : text
    })
    .get()
    .join(' ')
  }
  content = Liputan6.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
Liputan6.prototype.cleanContent = function(content) {
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\t)+/g, ' ')
  content = content.replace(/( ?\n ?| ?\r ?)+/g, '\n')
  content = content.replace(/(\ |\ |\ |\ )+/g, ' ')
  content = content.replace(/(–|—|--)+/g, '-')
  content = content.replace(/”|“/g, '"')
  while (content.length > 0 && content[0].match(/( |-|,)/))
    content = content.substring(1)
  while (content.length > 0 && content[content.length-1]===' ')
    content = content.substring(0, content.length-1)
  content = content.replace(/( ?\n ?| ?\r ?)+/g, '\n')
  content = content.trim()
  return content
}

module.exports = new Liputan6 ()