package one.yjchen.tr.external.model;

public record TwitchErrorResponse(
        String message,
        String error,
        String details
) {
}
