# Simple frontend
A very basic webapp boilerplate only using html, css, js (and a little jquery that i want to eliminate one day) 

### HowTo

 1. Put it on your webserver

 2. If u use apache create a .htaccess file with following content in the root directory:

```apacheconf
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ ./index.html [NC,L]
```
   If u use nginx change location in ur server block config to this:

```nginx
	location / {
		try_files $uri $uri/ /index.html =404;
	}

```

3. Thats it!