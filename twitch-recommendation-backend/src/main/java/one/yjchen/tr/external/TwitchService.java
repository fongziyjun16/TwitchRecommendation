package one.yjchen.tr.external;

import one.yjchen.tr.external.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@Service
public class TwitchService {

    private final String twitchClientId;
    private final String twitchSecret;
    private final TwitchApiClient twitchApiClient;
    private final TwitchIdentityClient twitchIdentityClient;

    private TwitchToken token = null;

    public TwitchService(
            @Value("${twitch.client-id}") String twitchClientId,
            @Value("${twitch.secret}") String twitchSecret,
            TwitchApiClient twitchApiClient,
            TwitchIdentityClient twitchIdentityClient) {
        this.twitchClientId = twitchClientId;
        this.twitchSecret = twitchSecret;
        this.twitchApiClient = twitchApiClient;
        this.twitchIdentityClient = twitchIdentityClient;
    }

    private <T> T requestWithToken(Supplier<T> requestSupplier) {
        if (token == null) {
            token = twitchIdentityClient.requestAccessToken(
                    twitchClientId,
                    twitchSecret,
                    "client_credentials");
        }
        try {
            return requestSupplier.get();
        } catch (WebClientResponseException.Unauthorized exception) {
            token = twitchIdentityClient.requestAccessToken(
                    twitchClientId,
                    twitchSecret,
                    "client_credentials");
            return requestSupplier.get();
        }
    }

    private String bearerToken() {
        return "Bearer " + token.accessToken();
    }

    public List<Game> getTopGames() {
        return requestWithToken(() ->
                twitchApiClient.getTopGames(bearerToken()).data());
    }

    public List<Game> getGames(String name) {
        return requestWithToken(() ->
                twitchApiClient.getGames(bearerToken(), name).data());
    }

    public List<Stream> getStreams(List<String> gameIds, int first) {
        return requestWithToken(() ->
                twitchApiClient.getStreams(bearerToken(), gameIds, first)).data();
    }

    public List<Video> getVideos(String gameId, int first) {
        return requestWithToken(() ->
                twitchApiClient.getVideos(bearerToken(), gameId, first)).data();
    }

    public List<Clip> getClips(String gameId, int first) {
        return requestWithToken(() ->
                twitchApiClient.getClips(bearerToken(), gameId, first)).data();
    }

    public List<String> getTopGameIds() {
        List<String> topGameIds = new ArrayList<>();
        for (Game game : getTopGames()) {
            topGameIds.add(game.id());
        }
        return topGameIds;
    }

}
