steal("funcunit/qunit", "jquery/dom/deparam", "jquery/dom/selection").then(function () {

	module("jquery/dom/deparam");

	test("basic querystring", function () {
		same($.deparam('a=b'), {a:'b'}, 'basic a=b');
		same($.deparam('a=b&b=a'), {a:'b',b:'a'}, 'basic a=b&b=a');
	});

	test("querystring with object", function () {
		same($.deparam('a[b]=c&a[c]=b'), {a:{b:'c',c:'b'}}, 'basic object');
		same($.deparam('a[b][c]=d'), {a:{b:{c:'d'}}}, 'nested object');
	});
	
	test('querystring with array', function () {
		same($.deparam('a[]=b&a[]=c'), {a:['b','c']}, 'basic array');
		same($.deparam('a[]=b&a[]=c&b[]=d'), {a:['b','c'],b:['d']}, 'two arrays');
	});
	
	test('mixed type querystrings', function () {
		same(
			$.deparam('a[]=b&a[]=c&b[a]=c&b[b][]=a&b[b][]=b'),
			{a:['b','c'],b:{a:'c',b:['a','b']}},
			'object with array children');
			
		same(
			$.deparam('a[a][][a]=a&a[a][][a]=a'),
			{a:{a:[{a:'a'},{a:'a'}]}},
			'array with object children');
	});
	
	test('complex querystrings', function () {
		var obj = {
			a: 'b',
			b: ['1', 'd'],
			c: {
				a: ['1', '2', '3'],
				b: '4'
			},
			d: [
				'a',
				'b',
				{c: 'd', e: 'f'},
				['g', 'h', ['i']]
			],
			e: ['f']
		};
		same($.deparam(decodeURIComponent($.param(obj))), obj, 'complex object');
	});
	
	test('automatic type conversion', function () {
		same($.deparam('a=999', true), {a:999}, 'valid numbers');
		same($.deparam('a=Infinity', true), {a:'Infinity'}, 'invalid numbers: Infinity');
		same($.deparam('a=NaN', true), {a:'NaN'}, 'invalid numbers: NaN');
		same($.deparam('a=true&b=false', true), {a:true,b:false}, 'boolean values');
		same($.deparam('a=', true), {a:undefined}, 'undefined values');
	});
});