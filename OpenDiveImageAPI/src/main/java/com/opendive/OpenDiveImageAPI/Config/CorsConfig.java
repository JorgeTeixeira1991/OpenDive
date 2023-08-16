package com.opendive.OpenDiveImageAPI.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // You can restrict the path pattern and add more configurations as per your need
                .allowedOrigins("*") // Allows all origins. You can customize this as per your requirements.
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allows specific HTTP methods. You can add more methods as per your requirements.
                .allowedHeaders("*") // Allows all headers. You can customize this as per your requirements.
                .allowCredentials(false) // Allow credentials
                .maxAge(3600); // Max age. You can customize this as per your requirements.
    }
}




