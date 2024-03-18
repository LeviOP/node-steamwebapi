import { RequestInit, Response } from 'node-fetch';

interface AchievementPercentages {
    achievements: AchievementPercentage[];
}
interface AchievementPercentage {
    name: string;
    percent: number;
}

interface PlayerSummaries {
    players: PlayerSummary[];
}
interface PlayerSummary {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    profileurl: string;
    lastlogoff: number;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    personastate: number;
    commentpermission?: 1;
    realname?: string;
    primaryclanid?: string;
    timecreated?: number;
    loccountrycode?: string;
    locstatecode?: string;
    loccityid?: number;
    gameid?: string;
    gameextrainfo?: string;
    gameserverip?: string;
}

interface FriendsList {
    friends: Friend[];
}
interface Friend {
    steamid: string;
    relationship: string;
    friend_since: number;
}

interface PlayerAchievementsFail {
    success: false;
    error: string;
}
interface PlayerAchievements<T extends Achievement> {
    steamID: string;
    gameName: string;
    achievements: T[];
    success: true;
}
interface Achievement {
    apiname: string;
    achieved: number;
    unlocktime: number;
}
interface AchievementWithStrings extends Achievement {
    name: string;
    description: string;
}

interface UserStats {
    steamID: string;
    gameName: string;
    achievements: UserStatsAchievement[];
}
interface UserStatsAchievement {
    name: string;
    achieved: number;
}

interface Game {
    appid: number;
    playtime_2weeks?: number;
    playtime_forever: number;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    rtime_last_played: number;
    playtime_disconnected: number;
}
interface GameAppInfo {
    name: string;
    img_icon_url: string;
    content_descriptorids: number[];
    has_community_visible_stats?: true;
    has_leaderboards?: true;
}
interface GameExtendedAppInfo {
    has_workshop: boolean;
    has_market: boolean;
    has_dlc: boolean;
}
interface OwnedGames<T> {
    game_count: number;
    games: T[];
}

interface RecentlyPlayedGames {
    total_count: number;
    games: RecentlyPlayedGame[];
}
interface RecentlyPlayedGame {
    appid: number;
    name: string;
    playtime_2weeks: number;
    playtime_forever: number;
    img_icon_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
}

declare enum BanContentCheckResult {
    NotScanned = 0,
    Reset = 1,
    NeedsChecking = 2,
    VeryUnlikely = 5,
    Unlikely = 30,
    Possible = 50,
    Likely = 75,
    VeryLikely = 100
}
declare enum CustomizationType {
    RarestAchievementShowcase = 1,
    GameCollector = 2,
    ItemShowcase = 3,
    ItemsUpForTrade = 4,
    BadgeCollector = 5,
    FavoriteGame = 6,
    ScreenshotShowcase = 7,
    CustomInfoBox = 8,
    FavoriteGroup = 9,
    ReviewShowcase = 10,
    WorkshopShowcase = 11,
    MyWorkshopShowcase = 12,
    ArtworkShowcase = 13,
    VideoShowcase = 14,
    FavoriteGuide = 15,
    MyGuides = 16,
    AchievementShowcase = 17,
    SalienStats = 20,
    AwardsShowcase = 21,
    FeaturedArtworkShowcase = 22,
    CompletionistShowcase = 23,
    SteamYearInReview = 24
}
interface TypeSlotMap {
    [CustomizationType.RarestAchievementShowcase]: undefined;
    [CustomizationType.GameCollector]: GameCollectorSlot[];
    [CustomizationType.ItemShowcase]: ItemShowcaseSlot[];
    [CustomizationType.ItemsUpForTrade]: ItemsUpForTradeSlot[];
    [CustomizationType.BadgeCollector]: BadgeCollectorSlot[];
    [CustomizationType.FavoriteGame]: [FavoriteGameSlot];
    [CustomizationType.ScreenshotShowcase]: ScreenshotShowcaseSlot[];
    [CustomizationType.CustomInfoBox]: [CustomInfoBoxSlot];
    [CustomizationType.FavoriteGroup]: [FavoriteGroupSlot];
    [CustomizationType.ReviewShowcase]: [ReviewShowcaseSlot];
    [CustomizationType.WorkshopShowcase]: [WorkshopShowcaseSlot];
    [CustomizationType.MyWorkshopShowcase]: [MyWorkshopShowcaseSlot];
    [CustomizationType.ArtworkShowcase]: ArtworkShowcaseSlot[];
    [CustomizationType.VideoShowcase]: VideoShowcaseSlot[];
    [CustomizationType.FavoriteGuide]: [FavoriteGuideSlot];
    [CustomizationType.MyGuides]: MyGuidesSlot[];
    [CustomizationType.AchievementShowcase]: AchievementShowcaseSlot[];
    [CustomizationType.SalienStats]: undefined;
    [CustomizationType.AwardsShowcase]: undefined;
    [CustomizationType.FeaturedArtworkShowcase]: FeaturedArtworkShowcaseSlot[];
    [CustomizationType.CompletionistShowcase]: CompletionistShowcaseSlot[];
    [CustomizationType.SteamYearInReview]: [SteamYearInReviewSlot] | undefined;
}
type Values<T> = T[keyof T];
type ActiveCustomization = Values<{
    [K in keyof TypeSlotMap]: ActiveCustomizationKnown<K>;
}> | ActiveCustomizationUnknown;
interface CustomizationSlot {
    slot: number;
}
interface GameCollectorSlot extends CustomizationSlot {
    appid: number;
}
interface ItemShowcaseSlot extends CustomizationSlot {
    appid: number;
    item_assetid: string;
    item_contextid: string;
    item_classid: string;
    item_instanceid: string;
}
interface ItemsUpForTradeSlot extends CustomizationSlot {
    appid: number;
    item_assetid: string;
    item_contextid: string;
    item_classid: string;
    item_instanceid: string;
}
interface BadgeCollectorSlot extends CustomizationSlot {
    appid?: number;
    badgeid?: number;
}
interface FavoriteGameSlot extends CustomizationSlot {
    appid: number;
}
interface ScreenshotShowcaseSlot extends CustomizationSlot {
    publishedfileid?: string;
}
interface CustomInfoBoxSlot extends CustomizationSlot {
    notes: string;
    title: string;
    ban_check_result: BanContentCheckResult;
}
interface FavoriteGroupSlot extends CustomizationSlot {
    accountid: number;
}
interface ReviewShowcaseSlot extends CustomizationSlot {
    appid: number;
}
interface WorkshopShowcaseSlot extends CustomizationSlot {
    appid: number;
    publishedfileid: string;
}
interface MyWorkshopShowcaseSlot extends CustomizationSlot {
    appid: number;
    publishedfileid: string;
}
interface ArtworkShowcaseSlot extends CustomizationSlot {
    publishedfileid?: string;
}
interface VideoShowcaseSlot extends CustomizationSlot {
    publishedfileid?: string;
}
interface FavoriteGuideSlot extends CustomizationSlot {
    appid: number;
    publishedfileid: string;
}
interface MyGuidesSlot extends CustomizationSlot {
    appid: number;
    publishedfileid: string;
}
interface AchievementShowcaseSlot extends CustomizationSlot {
    appid: number;
    title: string;
}
interface FeaturedArtworkShowcaseSlot extends CustomizationSlot {
    publishedfileid: string;
}
interface CompletionistShowcaseSlot extends CustomizationSlot {
    appid: number;
}
interface SteamYearInReviewSlot extends CustomizationSlot {
    replay_year: number;
}
interface ProfileCustomizations<C extends Customization> {
    customizations?: C[];
    slots_available: number;
    profile_theme: ProfileTheme;
    profile_preferences: ProfilePreferences;
}
interface Customization {
    customization_type: number;
    active: boolean;
    level: number;
}
interface ActiveCustomizationBase extends Customization {
    active: true;
    large: boolean;
    customization_style: number;
    purchaseid: string;
}
interface InactiveCustomization extends Customization {
    active: false;
}
interface ActiveCustomizationKnown<C extends keyof TypeSlotMap> extends ActiveCustomizationBase {
    customization_type: C;
    slots: TypeSlotMap[C];
}
type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc["length"]]>;
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
interface ActiveCustomizationUnknown extends ActiveCustomizationBase {
    customization_type: Exclude<IntRange<0, 30>, keyof TypeSlotMap>;
    slots?: CustomizationSlotUnknown[];
}
interface CustomizationSlotUnknown extends CustomizationSlot {
    appid?: number;
    publishedfileid?: string;
    item_assetid?: string;
    item_contextid?: string;
    notes?: string;
    title?: string;
    accountid?: number;
    badgeid?: number;
    border_color?: number;
    item_classid?: string;
    item_instanceid?: string;
    ban_check_result?: BanContentCheckResult;
    replay_year?: number;
}
interface ProfileCustomizationsPurchased {
    purchased_customizations?: PurchasedCustomization[];
}
interface PurchasedCustomization {
    purchaseid: string;
    customization_type: CustomizationType | number;
    level: number;
}
interface ProfileTheme {
    theme_id: string;
    title: string;
}
interface ProfilePreferences {
    hide_profile_awards: boolean;
}

interface Options {
    apiBase?: string;
    token?: string;
    fetchOptions?: RequestInit;
}
interface Call {
    interfaceName: string;
    method: string;
    version: number;
    options: Record<string, string | boolean | number | undefined>;
}
type ResponseWrapper<T, N extends string = "response"> = {
    [key in N]: T;
};
type ResponseWrapperEmpty<T, N extends string = "response"> = {
    [key in N]?: T;
};
declare class SteamWebAPI {
    API_BASE: string;
    private readonly token?;
    fetchOptions: RequestInit;
    constructor(optionsOrToken?: Options | string);
    get({ interfaceName, method, version, options }: Call): Promise<Response>;
    getGlobalAchievementPercentagesForApp({ gameid }: {
        gameid: number;
    }): Promise<ResponseWrapperEmpty<AchievementPercentages, "achievementpercentages">>;
    getPlayerSummaries({ steamids }: {
        steamids: string | string[];
    }): Promise<ResponseWrapper<PlayerSummaries>>;
    getFriendsList({ steamid, relationship }: {
        steamid: string;
        relationship: string;
    }): Promise<ResponseWrapper<FriendsList, "friendslist">>;
    getPlayerAchievements<L extends (string | undefined) = undefined>({ steamid, appid, l }: {
        steamid: string;
        appid: number;
        l?: L;
    }): Promise<ResponseWrapper<PlayerAchievementsFail | PlayerAchievements<(L extends string ? AchievementWithStrings : Achievement)>, "playerstats">>;
    getUserStatsForGame({ steamid, appid }: {
        steamid: string;
        appid: number;
    }): Promise<ResponseWrapperEmpty<UserStats, "playerstats">>;
    getOwnedGames<appinfo extends (boolean | undefined) = undefined, extended extends (boolean | undefined) = undefined>({ steamid, include_appinfo, include_played_free_games, include_extended_appinfo }: {
        steamid: string;
        include_appinfo?: appinfo;
        include_played_free_games?: boolean;
        include_extended_appinfo?: extended;
    }): Promise<ResponseWrapper<OwnedGames<Game & (appinfo extends true ? (extended extends true ? GameAppInfo & GameExtendedAppInfo : GameAppInfo) : {})>>>;
    getRecentlyPlayedGames({ steamid, count }: {
        steamid: string;
        count: number;
    }): Promise<ResponseWrapper<RecentlyPlayedGames>>;
    getProfileCustomization<inactive extends (boolean | undefined) = undefined, purchased extends (boolean | undefined) = undefined>({ steamid, include_inactive_customizations, include_purchased_customizations }: {
        steamid: string;
        include_inactive_customizations?: inactive;
        include_purchased_customizations?: purchased;
    }): Promise<ResponseWrapper<ProfileCustomizations<(inactive extends true ? (InactiveCustomization | ActiveCustomization) : ActiveCustomization)> & (purchased extends true ? ProfileCustomizationsPurchased : {})>>;
    static parseError(body: string): Error;
}

export { type Achievement, type AchievementPercentage, type AchievementPercentages, type AchievementShowcaseSlot, type AchievementWithStrings, type ActiveCustomization, type ActiveCustomizationBase, type ActiveCustomizationKnown, type ActiveCustomizationUnknown, type ArtworkShowcaseSlot, type BadgeCollectorSlot, BanContentCheckResult, type Call, type CompletionistShowcaseSlot, type CustomInfoBoxSlot, type Customization, type CustomizationSlot, type CustomizationSlotUnknown, CustomizationType, type FavoriteGameSlot, type FavoriteGroupSlot, type FavoriteGuideSlot, type FeaturedArtworkShowcaseSlot, type Friend, type FriendsList, type Game, type GameAppInfo, type GameCollectorSlot, type GameExtendedAppInfo, type InactiveCustomization, type ItemShowcaseSlot, type ItemsUpForTradeSlot, type MyGuidesSlot, type MyWorkshopShowcaseSlot, type Options, type OwnedGames, type PlayerAchievements, type PlayerAchievementsFail, type PlayerSummaries, type PlayerSummary, type ProfileCustomizations, type ProfileCustomizationsPurchased, type ProfilePreferences, type ProfileTheme, type PurchasedCustomization, type RecentlyPlayedGame, type RecentlyPlayedGames, type ReviewShowcaseSlot, type ScreenshotShowcaseSlot, type SteamYearInReviewSlot, type TypeSlotMap, type UserStats, type UserStatsAchievement, type VideoShowcaseSlot, type WorkshopShowcaseSlot, SteamWebAPI as default };
