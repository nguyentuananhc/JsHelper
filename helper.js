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