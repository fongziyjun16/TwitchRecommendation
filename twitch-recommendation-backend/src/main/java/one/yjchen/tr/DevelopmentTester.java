package one.yjchen.tr;

import one.yjchen.tr.external.TwitchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DevelopmentTester implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(DevelopmentTester.class);

    public DevelopmentTester(TwitchService twitchService) {
    }

    @Override
    public void run(ApplicationArguments args) {
    }
}
