package one.yjchen.tr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TwitchRecommendationBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TwitchRecommendationBackendApplication.class, args);
    }

}
