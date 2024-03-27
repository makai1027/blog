---
title: Nginx本地如何代理远程接口，遇到过哪些问题？
description: Nginx本地代理常见的操作场景以及遇到问题的解决方案
date: 2024-03-27 11:20:00
author: 马凯
tags:
 - 前端
 - 知识点
categories:
 - 前端
sidebar:
  title: Nginx本地如何代理远程接口，遇到过哪些问题？
isTimeLine: true
---

# Nginx本地如何代理远程接口，遇到过哪些问题？


## Nginx的本地安装过程

> 本文操作环境，macos、homebrew安装

1. 更新homebrew
```sh
brew update
```

2. 查看本地安装状态
```sh
brew search nginx
# 如若提示以下，则证明已安装成功
# ==> Formulae
# nginx ✔
```

3. 未安装则执行安装
```sh
brew install nginx
```

4. 安装完毕之后查看Nginx信息
```sh
brew info nginx
```
[如图所示](../../assets//nginx-1.png)
- 1）在/usr/local/etc/nginx/nginx.conf配置文件中默认端口被配置为8080，从而使nginx运行时不需要加sudo
- 2）Docroot默认为/usr/local/var/www
- 3）nginx将在/usr/local/etc/nginx/servers/目录中加载所有文件
- 4）以及我们可以通过最简单的命令 ‘ brew services restart nginx’ 来启动nginx


## nginx 接口代理配置
> 这个是Nginx的基础配置以及各场景的配置示例

```sh

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
  worker_connections  1024;
}


http {
  include       mime.types;
  default_type  application/octet-stream;

  #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
  #                  '$status $body_bytes_sent "$http_referer" '
  #                  '"$http_user_agent" "$http_x_forwarded_for"';

  #access_log  logs/access.log  main;

  sendfile        on;
  #tcp_nopush     on;

  #keepalive_timeout  0;
  keepalive_timeout  65;
  # 如果开启GZIP，那么我们构建后的文件可以不用进行GZIP，但是初次加载会消耗服务器性能进行文件的GZIP
  #gzip  on;

  server {
    listen       8080;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    # location /sinochem-scm/gateway {
    #     proxy_pass http://scm-sit.1chemic.com/sinochem-scm/gateway;
    #     # 删除.html后缀
    #     # if ($request_uri ~ ^/(.*)\.html$) {
    #     #     return 302 /$1;
    #     # }
    #     # # 重定向
    #     # try_files $uri $uri.html $uri/ =404;
    # }
    # 此处我想将/Users/makai/Documents/project/xxxxx下的文件代理到端口号8080下，这样我可以通过localhost:8080/xxx.html,访问/Users/makai/Documents/project/xxxxx下的html文件
    root /Users/makai/Documents/project/xxxxx;

    location / {
      index  index.html index.htm;
      try_files $uri $uri.html $uri/ =404;
      # 如果代理之后出现405的情况，可以使用改配置方法解决
      # error_page 405 =200 $request_uri;
    }

    # 接口代理，用于解决跨域问题，比如说我想将localhost:8080/aaa开头的的请求代理到某一个域名下的/aaa
      location /aaa/ {
        # 后台接口地址
        proxy_pass http://www.baidu.com/aaa/;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 有的教程会提示设置proxy_redirect default | off;这里不建议写因为可能会造成接口404；等下会给出原因
        # proxy_redirect default;
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Headers X-Requested-With;
        add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
        # 此处设置复杂请求的options预请求
        if ($request_method = 'OPTIONS') {
          add_header 'Access-Control-Max-Age' 1728000;
          add_header 'Content-Type' 'text/plain charset=utf-8';
          add_header 'Content-Length' 0;
          return 204;
        }
      }
      # 这里做的是不分资源的代理，比如说html文件内有通过相对路径引用的资源文件，但是在本地的话可能又找不到该资源
      # 举例
      # 比如说文件在服务器上的文件夹是/front/js/xxx,但是在本地就是./js/xxx，而且这些文件并不是你要更改的目标文件，则可以做如下代理设置
      location /front/ {
        proxy_pass http://www.baidu.com/front/;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
      }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
  }


  # another virtual host using mix of IP-, name-, and port-based configuration
  #
  #server {
  #    listen       8000;
  #    listen       somename:8080;
  #    server_name  somename  alias  another.alias;

  #    location / {
  #        root   html;
  #        index  index.html index.htm;
  #    }
  #}


  # HTTPS server
  #
  #server {
  #    listen       443 ssl;
  #    server_name  localhost;

  #    ssl_certificate      cert.pem;
  #    ssl_certificate_key  cert.key;

  #    ssl_session_cache    shared:SSL:1m;
  #    ssl_session_timeout  5m;

  #    ssl_ciphers  HIGH:!aNULL:!MD5;
  #    ssl_prefer_server_ciphers  on;

  #    location / {
  #        root   html;
  #        index  index.html index.htm;
  #    }
  #}
  include servers/*;
}
```


## 遇到的问题

### **1. proxy_redirect配置造成接口404；**
> 这里的解释来自chatGPT，

`proxy_redirect default` 指令的作用是修改被代理服务器返回的响应中的 `Location` 头字段和 `Refresh` 头字段的值。当被代理服务器返回一个重定向响应时,Nginx 会将 `Location` 头字段中的 URI 替换为本地 Nginx 服务器的 URI。这个指令通常用于当被代理服务器产生相对 URI 的重定向时,将其转换成本地服务器的绝对 URI。

如果使用 `proxy_redirect default` 造成接口 404 错误,可能的原因有:

1. **重定向循环**: 如果被代理服务器返回的重定向 URI 被 Nginx 修改后又指向了被代理服务器,就会造成重定向循环,最终导致 404 错误。

2. **URI 重写错误**: Nginx 修改重定向 URI 时可能存在错误,导致修改后的 URI 指向了错误的位置。

3. **缓存问题**: 如果启用了缓存,缓存中可能存在旧的重定向数据,导致错误。

为了解决这个问题,您可以尝试以下方法:

1. 检查 Nginx 的错误日志,查看是否有更多详细的错误信息。

2. 尝试关闭或修改 `proxy_redirect` 指令,例如将其改为 `proxy_redirect off`。

3. 检查被代理服务器返回的 `Location` 头字段是否正确。

4. 清除 Nginx 的缓存。

5. 尝试使用更明确的重定向规则,例如 `proxy_redirect http://example.com/ /`;。

6. 检查 Nginx 的其他相关配置,如 `proxy_pass`、`proxy_set_header` 等。

