package one.yjchen.tr.external.model;

import one.yjchen.tr.external.model.Video;

import java.util.List;

public record VideoResponse(
        List<Video> data
) {
}
