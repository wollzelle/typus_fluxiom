/*! ----------------------------------------------------------------------------
* underscore.more.js
* Copyright 2011 wollzelle GmbH (http://wollzelle.com). All rights reserved.
* --------------------------------------------------------------------------- */

_.mixin({
  
  getQueryString: function() {
    var result = {}, queryString = location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
  }

});