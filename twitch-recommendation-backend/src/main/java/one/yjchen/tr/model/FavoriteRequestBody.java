package one.yjchen.tr.model;

import one.yjchen.tr.db.entity.ItemEntity;

public record FavoriteRequestBody(
        ItemEntity favorite
) {
}
