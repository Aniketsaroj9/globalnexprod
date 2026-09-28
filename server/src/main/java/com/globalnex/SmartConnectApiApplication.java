package com.globalnex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class SmartConnectApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartConnectApiApplication.class, args);
    }
}
