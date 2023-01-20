package one.yjchen.tr.modal;

public record TwitchErrorResponse(
        String message,
        String error,
        String details
) {
}
