 ---
layout: article
title: How to configure CORS in Spring Boot
permalink: /articles/spring-boot-cors
tags: spring-boot, dev,spring,cors,security
lang: en
key: lang-en
---

- [ ] what is cors
- [ ] how to find out if cors is denied
- [ ] how to setup cors

How to configure cors in Spring Boot
```java

@Configuration
public class WebConfiguration  implements WebMvcConfigurer {
    private final long MAX_AGE_SECS = 3600;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE")
                .maxAge(MAX_AGE_SECS);
    }
}
```
