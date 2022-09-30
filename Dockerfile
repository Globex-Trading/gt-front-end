FROM nginx:1.23.1-alpine
RUN addgroup app && adduser -S -G app app
USER app
LABEL org.opencontainers.image.source="https://github.com/Globex-Trading/gt-front-end"
WORKDIR /app
COPY ./build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]