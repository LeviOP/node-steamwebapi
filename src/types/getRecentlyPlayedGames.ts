export interface RecentlyPlayedGames {
    total_count: number;
    games: RecentlyPlayedGame[];
}

export interface RecentlyPlayedGame {
    appid: number;
    name: string;
    playtime_2weeks: number;
    playtime_forever: number;
    img_icon_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
}
