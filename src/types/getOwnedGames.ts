export interface Game {
    appid: number;
    playtime_2weeks?: number;
    playtime_forever: number;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    rtime_last_played: number;
    playtime_disconnected: number;
}

export interface GameAppInfo {
    name: string;
    img_icon_url: string;
    content_descriptorids: number[];
    has_community_visible_stats?: true;
    has_leaderboards?: true;
}

export interface GameExtendedAppInfo {
    has_workshop: boolean;
    has_market: boolean;
    has_dlc: boolean;
}

export interface OwnedGames<T> {
    game_count: number;
    games: T[];
}
