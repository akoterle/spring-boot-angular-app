package com.akoterle.spring_boot.angular

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration

@SpringBootApplication(
        exclude = arrayOf(SecurityAutoConfiguration::class/*, SecurityFilterAutoConfiguration::class*/)/*,
        scanBasePackages = arrayOf("com.akoterle.springbootangular.com.akoterle.spring_boot.angular.auth")*/)

class SpringBootAngularApplication

fun main(args: Array<String>) {
    SpringApplication.run(SpringBootAngularApplication::class.java, *args)
}
