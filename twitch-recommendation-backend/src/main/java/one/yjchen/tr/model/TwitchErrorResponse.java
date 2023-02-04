package one.yjchen.tr.model;

public record TwitchErrorResponse(
        String message,
        String error,
        String details
) {
}
