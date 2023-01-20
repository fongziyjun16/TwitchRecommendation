package one.yjchen.tr.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import one.yjchen.tr.external.model.Clip;
import one.yjchen.tr.external.model.ItemType;
import one.yjchen.tr.external.model.Stream;
import one.yjchen.tr.external.model.Video;

public record ItemEntity(
        Long id,
        @JsonProperty("twitch_id") String twitchId,
        String title,
        String url,
        @JsonProperty("thumbnail_url") String thumbnailUrl,
        @JsonProperty("broadcaster_name") String broadcasterName,
        @JsonProperty("game_id") String gameId,
        @JsonProperty("item_type") ItemType type
) {
    public ItemEntity(String gameId, Video video) {
        this(
                null,
                video.id(), video.title(), video.url(),
                video.thumbnailUrl(), video.userName(),
                gameId, ItemType.VIDEO
        );
    }

    public ItemEntity(Clip clip) {
        this(
                null,
                clip.id(), clip.title(), clip.url(),
                clip.thumbnailUrl(), clip.broadcasterName(),
                clip.gameId(), ItemType.CLIP
        );
    }

    public ItemEntity(Stream stream) {
        this(
                null,
                stream.id(), stream.title(), null,
                stream.thumbnailUrl(), stream.userName(),
                stream.gameId(), ItemType.STREAM
        );
    }

}
