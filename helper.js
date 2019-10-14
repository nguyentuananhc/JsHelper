function parseURL(url) {
  var a = document.createElement('a');
  a.href = url;
  return {
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function () {
      var ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length, i = 0, s;
      for (; i < len; i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    hash: a.hash.replace('#', '')
  };
}


// example 
// console.log(parseURL('https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme&itemLast=abc#hashtag1'))

// output
// "host":"marketplace.visualstudio.com",
//   "port":"",
//   "query":"?itemName=Equinusocio.vsc-material-theme&itemLast=abc",
//   "params":{
//     "itemName":"Equinusocio.vsc-material-theme",
//     "itemLast":"abc"
//   },
//   "hash":"hashtag1"
// }

const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty("length") && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0);


const storage = {
  get: (key) => {
    const isClient = typeof window === 'object';
    if (!isClient) {
      return null
    }
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return localStorage.getItem(key)
    }
  },
  set: (key, value) => {
    const finalValue = typeof value === 'object' ? JSON.stringify(value) : value.toString()
    localStorage.setItem(key, finalValue)
  },
  remove: (key) => {
    localStorage.removeItem(key)
  }
}

const formatTextFloat = (
  text,
  count = 0,
  displayNullWhenValueEqualZero = false,
) => {
  if (text) {
    return text.toLocaleString('en', {
      minimumFractionDigits: count,
      maximumFractionDigits: count,
    });
  }
  if (text === 0 && !displayNullWhenValueEqualZero) {
    return parseFloat(text).toFixed(count);
  }
  return '--';
}

var formatDate = function (timestamp) {

	// Create a date object from the timestamp
	var date = new Date(timestamp);

	// Create a list of names for the months
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];

	// return a formatted date
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

};

/**
 * Get the value of a cookie
 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 * @param  {String} name  The name of the cookie
 * @return {String}       The cookie value
 */
var getCookie = function (name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
};

// Set a cookie named sandwich, with a value of turkey
// Cookie expires on December 31, 2024 at 11:59 and 59 seconds PM
// document.cookie = 'sandwich=turkey; expires=Fri, 31 Dec 2040 23:59:59 GMT';

// var sandwich = getCookie('sandwich');
// console.log(sandwich);