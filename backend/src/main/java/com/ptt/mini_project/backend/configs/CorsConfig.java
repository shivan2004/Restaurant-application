package com.ptt.mini_project.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                                "http://localhost:3000",
                                "http://localhost",
                                "http://192.168.0.102:3000",
                                "http://192.168.0.117:3000",
                                "http://192.168.0.117"
                        )
//                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // Allow all necessary methods
                        .allowedHeaders("*"); // Allow all headers
            }
        };
    }
}
