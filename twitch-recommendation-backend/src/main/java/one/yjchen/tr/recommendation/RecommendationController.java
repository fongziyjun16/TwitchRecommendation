package one.yjchen.tr.recommendation;

import one.yjchen.tr.db.entity.UserEntity;
import one.yjchen.tr.model.TypeGroupedItemList;
import one.yjchen.tr.user.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final UserService userService;

    public RecommendationController(RecommendationService recommendationService, UserService userService) {
        this.recommendationService = recommendationService;
        this.userService = userService;
    }

    @GetMapping("/recommendation")
    public TypeGroupedItemList getRecommendation(@AuthenticationPrincipal User user) {
        UserEntity userEntity = user != null ? userService.findByUsername(user.getUsername()) : null;
        return recommendationService.recommendItems(userEntity);
    }

}
