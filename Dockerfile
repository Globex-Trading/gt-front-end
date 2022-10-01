FROM nginx:1.23.1-alpine
# RUN addgroup app && adduser -S -G app app
USER root
LABEL org.opencontainers.image.source="https://github.com/Globex-Trading/gt-front-end"
WORKDIR /app
COPY ./resources/certs ./certs
RUN echo "server { listen 443; ssl on; ssl_certificate /app/certs/fullchain.pem; ssl_certificate_key /app/certs/privkey.pem; server_name www.teamone.shop; access_log /var/log/nginx/nginx.vhost.access.log; error_log /var/log/nginx/nginx.vhost.error.log; location / { root /usr/share/nginx/html; index index.html index.htm; } }" >> /etc/nginx/conf.d/https-default.conf
COPY ./build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]