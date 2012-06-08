steal("jquery/dom").then(function( $ ) {

	var convertValue = function (value) {
		if ($.isNumeric(value)) {
			return parseFloat(value);
		} else if (value === 'true') {
			return true;
		} else if (value === 'false') {
			return false;
		} else if (value === '') {
			return undefined;
		}

		return value;
	}, parseItem = function (result, key, value) {
		if (key.indexOf('[') === -1) {
			result[key] = value;
		} else {
			var newKey = key.slice(0, key.indexOf('['));
			var keys = key.slice(newKey.length + 1, -1).split('][');
			keys.splice(0, 0, newKey);
			
			for (var i = 0; i < keys.length; i++) {
				if (keys[i] === '') {
					if (typeof keys[i + 1] === 'undefined') {
						result.push(value);
					} else {
						var tmp = keys[i + 1] ? {} : [];
						result.push(tmp);
						result = tmp;
					}
				} else {
					if (typeof result[keys[i]] === 'undefined') {
						if (typeof keys[i + 1] === 'undefined') {
							result[keys[i]] = value;
						} else {
							result[keys[i]] = keys[i + 1] ? {} : [];
						}
					}
					
					result = result[keys[i]];
				}
			}
		}
	};

	/**
	 * @function jQuery.fn.deparam
	 * @parent jQuery.deparam
	 * @plugin jquery/dom/deparam
	 * @test jquery/dom/deparam/qunit.html
	 *
	 * Reverses jQuery.param; returns an object from a querystring.
	 *
	 * @param {String} [querystring] The querystring to be parsed.
	 * @param {Boolean} [convert=false] True if strings that look like numbers
	 * and booleans should be converted.
	 * @return {Object} The parsed querystring.
	 */
	$.extend({
		deparam: function(querystring, convert) {
			querystring = querystring.split('&');

			for (var i = 0, result = {}; i < querystring.length; i++) {
				querystring[i] = querystring[i].split('=');
				if (typeof convert === 'boolean' && convert) {
					querystring[i][1] = convertValue(querystring[i][1]);
				}
				parseItem(result, querystring[i][0], querystring[i][1]);
			}

			return result;
		}
	});
});
