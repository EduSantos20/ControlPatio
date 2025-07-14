//package com.example.controlPatio.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//    @Configuration
//    @EnableWebSecurity
//    public class SecurityConfig {
//        @Bean
//        public PasswordEncoder passwordEncoder() {
//            return new BCryptPasswordEncoder();
//        }
//
//        @Bean
//        public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
//            return authConfig.getAuthenticationManager();
//        }
//
//        @Bean
//        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//            http
//                    .authorizeHttpRequests(authz -> authz
//                            .requestMatchers("/templates/login", "/index", "/css/**", "/js/**", "/images/**").permitAll() // rotas públicas
//                            .anyRequest().authenticated() // todas as outras precisam de login
//                    )
//                    .formLogin(form -> form
//                            .loginPage("/templates/login")
//                            .defaultSuccessUrl("/index", true)
//                            .failureUrl("/login?error=true")
//                            .permitAll()
//                    )
//                    .logout(logout -> logout
//                            .logoutUrl("/logout")
//                            .logoutSuccessUrl("/login?logout=true")
//                            .permitAll()
//                    );
//
//            return http.build();
//        }
//    }

