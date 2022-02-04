(function() {
	var _ = {};
	var m = 1.0;
	var q = Packages.cn.mbrowser.config.App;
	var r = Packages.cn.mbrowser.config.App().c.applicationContext;
	var s = android.webkit.MimeTypeMap.getSingleton();
	var t = java.io;
	var u = java.lang;
	var v = t.File.separator;
	var w = path() + v + 'qm' + v + info().sign.substring(0, 4) + '$$$' + info().name + v;
	isString = (val) = >typeof val === 'string';
	function isObject(a) {
		const type = typeof a;
		return a != null && (type == 'object' || type == 'function')
	}
	var y = java.util.concurrent;
	var z = new y.Executors.newCachedThreadPool();
	function thread(a) {
		obj = {
			call: function() {
				return a()
			},
		};
		var b = new y.FutureTask(obj);
		z.submit(b);
		return b
	}
	function chunk(a, b) {
		let index = 0;
		let res = [];
		while (index < a.length) {
			res.push(a.slice(index, index + b));
			index += b
		}
		return res.filter((o) = >o.length > 0)
	}
	function submit(l, n) {
		c = [];
		list = chunk(l, l.length / n);
		var n = 0;
		while (n < list.length) {
			function l(x) {
				return function o() {
					var a = [];
					for (let i = 0; i < list[x].length; i++) {
						a.push(list[x][i]())
					}
					return a
				}
			}
			c.push(thread(l(n)));
			n++
		}
		return c
	}
	function mkdirs(f) {
		var a = f.getParentFile();
		if (!a.exists()) a.mkdirs()
	}
	function write(a, b) {
		var c = new t.File(w + '数据' + v + b);
		mkdirs(c);
		var d = new t.FileWriter(c, false);
		d.write(a);
		d.close()
	}
	function read(a) {
		var b = new t.File(w + '数据' + v + a);
		var c = 0;
		if (!b.exists() || (c = b.length()) == 0) return '';
		var d = u.reflect.Array.newInstance(u.Byte.TYPE, c);
		var e = new t.FileInputStream(b);
		e.read(d);
		e.close();
		return new u.String(d)
	}
	var A = Packages.org.jsoup;
	var B = A.Connection.Method;
	function http(o) {
		let {
			url,
			header,
			params,
			json,
			method,
			re
		} = o;
		var a = A.Jsoup.connect(url);
		a.ignoreContentType(true);
		a.maxBodySize(1048576000);
		re === false ? a.followRedirects(re) : a.followRedirects(true);
		if (isObject(header)) for (x in header) a.header(x, header[x]);
		if (isObject(params)) {
			if (json === true) a.requestBody(params);
			else for (p in params) a.data(p, params[p])
		}
		var b;
		if (json === true || method == 'post') b = a.method(B.POST).execute();
		else b = a.method(B.GET).execute();
		return b
	}
	function httpBody(a, b) {
		a.charset(b);
		return a.body()
	}
	function httpCookie(a, b) {
		return b + '=' + a.cookie(b)
	}
	function httpCookies(a) {
		var b = '';
		var c = a.cookies().entrySet().iterator();
		while (c.hasNext()) {
			var d = c.next();
			b += d.getKey() + '=' + d.getValue() + ';'
		}
		return b
	}
	function httpHeader(a, b) {
		return a.header(b)
	}
	function httpHeaders(a) {
		var b = '';
		var c = a.headers().entrySet().iterator();
		while (c.hasNext()) {
			var d = c.next();
			b += d.getKey() + '=' + d.getValue() + ';'
		}
		return b
	}
	function trimU(a) {
		var b = a.lastIndexOf('/');
		if (a.length() == b + 1) {
			a = a.substring(0, b);
			return trimU(a)
		}
		return a.substring(0, a.lastIndexOf('.'))
	}
	function download(o) {
		try {
			let {
				setpath,
				tips
			} = o;
			var a = http(o);
			var b = trimU(a.url().toString());
			var c = s.getExtensionFromMimeType(a.contentType().split(';')[0]);
			var d = b.substring(b.lastIndexOf('/') + 1) + '.' + c;
			savepath = isString(setpath) ? setpath + v + d: w + '下载' + v + d;
			var f = a.bodyStream();
			var g = new u.reflect.Array.newInstance(u.Byte.TYPE, 4096);
			var h = 0;
			var i = new t.ByteArrayOutputStream();
			while ((h = f.read(g)) != -1) {
				i.write(g, 0, h)
			}
			var j = new t.File(savepath);
			mkdirs(j);
			var k = new t.FileOutputStream(j);
			k.write(i.toByteArray());
			if (tips === false) return savepath;
			toast('下载成功，路径:' + savepath);
			return savepath
		} catch(e) {
			error(e);
			toast('下载失败,请打开调试台查看具体异常信息')
		} finally {
			if (i != null) i.close();
			if (k != null) k.close();
			if (f != null) f.close()
		}
	}
	var C = r.getSharedPreferences(info().sign, r.MODE_PRIVATE);
	function putSp(a, b) {
		var c = C.edit();
		c.putString(a, b);
		c.commit()
	}
	function getSp(a, b) {
		return C.getString(a, b)
	}
	function clearSp(a) {
		var c = C.edit();
		c.remove(a);
		c.commit()
	}
	function removeSp() {
		var c = C.edit();
		c.clear();
		c.commit()
	}
	function $() {
		var a = arguments.length;
		switch (a) {
		case 1:
			return getVar(arguments[0]);
		case 2:
			return putVar(arguments[0], arguments[1]);
		default:
			return getCode()
		}
	}
	function error(e) {
		isString(e) ? 报错 (e) : 报错 (e.toString())
	}
	function toast(a) {
		q.h.b(a)
	}
	function back() {
		new Packages.android.app.Instrumentation().sendKeyDownUpSync(4)
	}
	function path() {
		return r.getExternalFilesDir(null).getPath()
	}
	function sleep(a) {
		java.lang.Thread.sleep(a)
	}
	function info() {
		o = {};
		o.sign = e2Rex(getVar('QMINFO'), '.get(sign).t()');
		o.version = e2Rex(getVar('QMINFO'), '.get(version).t()');
		o.name = e2Rex(getVar('QMINFO'), '.get(name).t()');
		return o
	}
	_.VERSION = m;
	_.read = read;
	_.write = write;
	_.sleep = sleep;
	_.thread = thread;
	_.submit = submit;
	_.chunk = chunk;
	_.back = back;
	_.isString = isString;
	_.http = http;
	_.bd = httpBody;
	_.ck = httpCookie;
	_.cks = httpCookies;
	_.hd = httpHeader;
	_.hds = httpHeaders;
	_.download = download;
	_.info = info;
	_.toast = toast;
	_.error = error;
	_.putSp = putSp;
	_.getSp = getSp;
	_.clearSp = clearSp;
	_.delSp = removeSp;
	_.$ = $;
	this._ = _
}.call(this));