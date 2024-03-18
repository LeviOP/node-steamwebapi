// We don't use {} as a type, but as something to join with nothing.
/* eslint @typescript-eslint/ban-types: 0 */

import fetch, { type RequestInit, type Response } from "node-fetch";
import { JSDOM } from "jsdom";
import { AchievementPercentages, AchievementPercentage } from "./types/getGlobalAchievementPercentagesForApp.js";
import { PlayerSummaries, PlayerSummary } from "./types/getPlayerSummaries.js";
import { FriendsList, Friend } from "./types/getFriendsList.js";
import { Achievement, AchievementWithStrings, PlayerAchievements, PlayerAchievementsFail } from "./types/getPlayerAchievements.js";
import { UserStats, UserStatsAchievement } from "./types/getUserStatsForGame.js";
import { Game, GameAppInfo, GameExtendedAppInfo, OwnedGames } from "./types/getOwnedGames.js";
import { RecentlyPlayedGames, RecentlyPlayedGame } from "./types/getRecentlyPlayedGames.js";
import { ActiveCustomization, InactiveCustomization, ProfileCustomizations, ProfileCustomizationsPurchased, TypeSlotMap, CustomizationSlot, MyGuidesSlot, ProfileTheme, Customization, FavoriteGameSlot, ItemShowcaseSlot, CustomInfoBoxSlot, FavoriteGroupSlot, FavoriteGuideSlot, GameCollectorSlot, VideoShowcaseSlot, BadgeCollectorSlot, ProfilePreferences, ReviewShowcaseSlot, ArtworkShowcaseSlot, ItemsUpForTradeSlot, WorkshopShowcaseSlot, SteamYearInReviewSlot, MyWorkshopShowcaseSlot, PurchasedCustomization, ScreenshotShowcaseSlot, AchievementShowcaseSlot, ActiveCustomizationBase, ActiveCustomizationKnown, CustomizationSlotUnknown, CompletionistShowcaseSlot, ActiveCustomizationUnknown, FeaturedArtworkShowcaseSlot, CustomizationType, BanContentCheckResult } from "./types/getProfileCustomization.js";

export {
    AchievementPercentages, AchievementPercentage,
    PlayerSummaries, PlayerSummary,
    FriendsList, Friend,
    Achievement, AchievementWithStrings, PlayerAchievements, PlayerAchievementsFail,
    UserStats, UserStatsAchievement,
    Game, GameAppInfo, GameExtendedAppInfo, OwnedGames,
    RecentlyPlayedGames, RecentlyPlayedGame,
    ActiveCustomization, InactiveCustomization, ProfileCustomizations, ProfileCustomizationsPurchased, TypeSlotMap, CustomizationSlot, MyGuidesSlot, ProfileTheme, Customization, FavoriteGameSlot, ItemShowcaseSlot, CustomInfoBoxSlot, FavoriteGroupSlot, FavoriteGuideSlot, GameCollectorSlot, VideoShowcaseSlot, BadgeCollectorSlot, ProfilePreferences, ReviewShowcaseSlot, ArtworkShowcaseSlot, ItemsUpForTradeSlot, WorkshopShowcaseSlot, SteamYearInReviewSlot, MyWorkshopShowcaseSlot, PurchasedCustomization, ScreenshotShowcaseSlot, AchievementShowcaseSlot, ActiveCustomizationBase, ActiveCustomizationKnown, CustomizationSlotUnknown, CompletionistShowcaseSlot, ActiveCustomizationUnknown, FeaturedArtworkShowcaseSlot, CustomizationType, BanContentCheckResult
};

export interface Options {
    apiBase?: string;
    token?: string;
    fetchOptions?: RequestInit;
}

export interface Call {
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

export default class SteamWebAPI {
    API_BASE: string = "http://api.steampowered.com";
    private readonly token?: string;
    fetchOptions: RequestInit;

    constructor(optionsOrToken?: Options | string) {
        if (typeof optionsOrToken === "object") {
            const { apiBase, token, fetchOptions = {} } = optionsOrToken;
            if (apiBase !== undefined) this.API_BASE = apiBase;
            if (token !== undefined) this.token = token;
            this.fetchOptions = fetchOptions;

            return;
        }

        if (typeof optionsOrToken === "string") this.token = optionsOrToken;

        this.fetchOptions = {};
    }

    async get({ interfaceName, method, version, options }: Call): Promise<Response> {
        const o: Record<string, string> = {};
        for (const key in options) {
            const value = options[key as keyof typeof options];
            if (value === undefined) continue;
            o[key] = value.toString();
        }

        const params = new URLSearchParams(o);
        const res = await fetch(`${this.API_BASE}/${interfaceName}/${method}/v${version}?${params}`, this.fetchOptions);
        return res;
    }

    async getGlobalAchievementPercentagesForApp({ gameid }: { gameid: number }): Promise<ResponseWrapperEmpty<AchievementPercentages, "achievementpercentages">> {
        const res = await this.get({
            interfaceName: "ISteamUserStats",
            method: "GetGlobalAchievementPercentagesForApp",
            version: 2,
            options: {
                gameid
            }
        });

        if (!res.ok) throw SteamWebAPI.parseError(await res.text());

        const json = await res.json() as ResponseWrapperEmpty<AchievementPercentages, "achievementpercentages">;
        return json;
    }

    async getPlayerSummaries({ steamids }: { steamids: string | string[] }): Promise<ResponseWrapper<PlayerSummaries>> {
        const key = this.token;
        if (key === undefined) throw Error("GetPlayerSummaries requires a token!");

        if (typeof steamids !== "string") steamids = steamids.join(",");

        const res = await this.get({
            interfaceName: "ISteamUser",
            method: "GetPlayerSummaries",
            version: 2,
            options: {
                key,
                steamids
            }
        });

        if (!res.ok) throw SteamWebAPI.parseError(await res.text());

        const json = await res.json() as ResponseWrapper<PlayerSummaries>;
        return json;
    }

    async getFriendsList({ steamid, relationship }: { steamid: string, relationship: string }): Promise<ResponseWrapper<FriendsList, "friendslist">> {
        const key = this.token;
        if (key === undefined) throw Error("GetFriendList requires a token!");

        const res = await this.get({
            interfaceName: "ISteamUser",
            method: "GetFriendList",
            version: 1,
            options: {
                key,
                steamid,
                relationship
            }
        });

        if (!res.ok) throw SteamWebAPI.parseError(await res.text());

        const json = await res.json() as ResponseWrapper<FriendsList, "friendslist">;
        return json;
    }

    async getPlayerAchievements<L extends (string | undefined) = undefined>({ steamid, appid, l }: {
        steamid: string,
        appid: number,
        l?: L
    }): Promise<ResponseWrapper<PlayerAchievementsFail | PlayerAchievements<(L extends string ? AchievementWithStrings : Achievement)>, "playerstats">> {
        const key = this.token;
        if (key === undefined) throw Error("GetPlayerAchievements requires a token!");

        const res = await this.get({
            interfaceName: "ISteamUserStats",
            method: "GetPlayerAchievements",
            version: 1,
            options: {
                key,
                steamid,
                appid,
                l
            }
        });

        if (!res.ok) throw SteamWebAPI.parseError(await res.text());

        const json = await res.json() as ResponseWrapper<PlayerAchievementsFail | PlayerAchievements<(L extends string ? AchievementWithStrings : Achievement)>, "playerstats">;
        return json;
    }

    async getUserStatsForGame({ steamid, appid }: { steamid: string, appid: number }): Promise<ResponseWrapperEmpty<UserStats, "playerstats">> {
        const key = this.token;
        if (key === undefined) throw Error("Token required!");

        const res = await this.get({
            interfaceName: "ISteamUserStats",
            method: "GetUserStatsForGame",
            version: 2,
            options: {
                key,
                steamid,
                appid
            }
        });

        if (!res.ok) throw SteamWebAPI.parseError(await res.text());

        const json = await res.json() as ResponseWrapperEmpty<UserStats, "playerstats">;
        return json;
    }

    async getOwnedGames<appinfo extends (boolean | undefined) = undefined, extended extends (boolean | undefined) = undefined>
    ({ steamid, include_appinfo, include_played_free_games, include_extended_appinfo }: {
        steamid: string,
        include_appinfo?: appinfo,
        include_played_free_games?: boolean,
        include_extended_appinfo?: extended
    }): Promise<ResponseWrapper<OwnedGames<Game & (appinfo extends true ? (extended extends true ? GameAppInfo & GameExtendedAppInfo : GameAppInfo) : {})>>> {
        const key = this.token;
        if (key === undefined) throw Error("GetOwnedGames requires a token!");

        const res = await this.get({
            interfaceName: "IPlayerService",
            method: "GetOwnedGames",
            version: 1,
            options: {
                key,
                steamid,
                include_appinfo,
                include_played_free_games,
                include_extended_appinfo
            }
        });

        if (!res.ok) throw SteamWebAPI.parseError(await res.text());

        const json = await res.json() as ResponseWrapper<OwnedGames<Game & (appinfo extends true ? (extended extends true ? GameAppInfo & GameExtendedAppInfo : GameAppInfo) : {})>>;
        return json;
    }

    async getRecentlyPlayedGames({ steamid, count }: { steamid: string, count: number }): Promise<ResponseWrapper<RecentlyPlayedGames>> {
        const key = this.token;
        if (key === undefined) throw Error("GetRecentlyPlayedGames requires a token!");

        const res = await this.get({
            interfaceName: "IPlayerService",
            method: "GetRecentlyPlayedGames",
            version: 1,
            options: {
                key,
                steamid,
                count
            }
        });

        if (!res.ok) throw SteamWebAPI.parseError(await res.text());

        const json = await res.json() as ResponseWrapper<RecentlyPlayedGames>;
        return json;
    }

    async getProfileCustomization<inactive extends (boolean | undefined) = undefined, purchased extends (boolean | undefined) = undefined>
    ({ steamid, include_inactive_customizations, include_purchased_customizations }: {
        steamid: string,
        include_inactive_customizations?: inactive,
        include_purchased_customizations?: purchased
    }): Promise<ResponseWrapper<ProfileCustomizations<(inactive extends true ? (InactiveCustomization | ActiveCustomization) : ActiveCustomization)> & (purchased extends true ? ProfileCustomizationsPurchased : {})>> {
        const key = this.token;
        if (key === undefined) throw Error("GetRecentlyPlayedGames requires a token!");

        const res = await this.get({
            interfaceName: "IPlayerService",
            method: "GetProfileCustomization",
            version: 1,
            options: {
                steamid,
                include_inactive_customizations,
                include_purchased_customizations
            }
        });

        if (!res.ok) throw SteamWebAPI.parseError(await res.text());

        const json = await res.json() as ResponseWrapper<ProfileCustomizations<(inactive extends true ? (InactiveCustomization | ActiveCustomization) : ActiveCustomization)> & (purchased extends true ? ProfileCustomizationsPurchased : {})>;
        return json;
    }

    static parseError(body: string): Error {
        const document = new JSDOM(body).window.document;

        const name = document.querySelector("h1")?.textContent ?? null;
        const message = Array.from(document.body.childNodes).slice(1).reduce((p, c) => p + c.textContent, "");

        const error = new Error(message);
        if (name !== null) error.name = name;

        return error;
    }
}
