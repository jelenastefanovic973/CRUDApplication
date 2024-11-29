package application;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner demo(ClientRepository clientRepository) {
        return args -> {
            clientRepository.save(new Client("Jane Doe", "jane@outlook.com"));
            clientRepository.save(new Client("Bob Smith", "bob@outlook.com"));
            clientRepository.save(new Client("John Doe", "john@outlook.com"));

            log.info("Customers found with findAll():");
            log.info("------");
            clientRepository.findAll().forEach(customer -> log.info(customer.toString()));
            log.info("");
        };
    }
}
