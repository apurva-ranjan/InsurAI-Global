package com.insurai.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF (Common for stateless REST APIs using JWT)
            .csrf(csrf -> csrf.disable())
            
            // 2. Enable and Configure CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // 3. Configure Request Authorization
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/policies/**").permitAll() // Publicly accessible
                .anyRequest().authenticated()                                   // Private
            );

        return http.build();
    }

    // This is the standard way to define your CORS settings for Spring Security
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        
        // whitelisting your frontend origins
        config.setAllowedOrigins(List.of(
            "http://localhost:3000",
            "https://fearless-nourishment-production-1798.up.railway.app"
        ));
        
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // Required if you use cookies or Authorization headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Apply this to all endpoints
        return source;
    }
}