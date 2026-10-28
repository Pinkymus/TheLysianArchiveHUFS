from caddy:2-alpine

copy Caddyfile /etc/caddy/Caddyfile


copy . /srv

expose 80