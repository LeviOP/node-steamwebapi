// src/index.ts
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

// src/types/getProfileCustomization.ts
var BanContentCheckResult = /* @__PURE__ */ ((BanContentCheckResult2) => {
  BanContentCheckResult2[BanContentCheckResult2["NotScanned"] = 0] = "NotScanned";
  BanContentCheckResult2[BanContentCheckResult2["Reset"] = 1] = "Reset";
  BanContentCheckResult2[BanContentCheckResult2["NeedsChecking"] = 2] = "NeedsChecking";
  BanContentCheckResult2[BanContentCheckResult2["VeryUnlikely"] = 5] = "VeryUnlikely";
  BanContentCheckResult2[BanContentCheckResult2["Unlikely"] = 30] = "Unlikely";
  BanContentCheckResult2[BanContentCheckResult2["Possible"] = 50] = "Possible";
  BanContentCheckResult2[BanContentCheckResult2["Likely"] = 75] = "Likely";
  BanContentCheckResult2[BanContentCheckResult2["VeryLikely"] = 100] = "VeryLikely";
  return BanContentCheckResult2;
})(BanContentCheckResult || {});
var CustomizationType = /* @__PURE__ */ ((CustomizationType2) => {
  CustomizationType2[CustomizationType2["RarestAchievementShowcase"] = 1] = "RarestAchievementShowcase";
  CustomizationType2[CustomizationType2["GameCollector"] = 2] = "GameCollector";
  CustomizationType2[CustomizationType2["ItemShowcase"] = 3] = "ItemShowcase";
  CustomizationType2[CustomizationType2["ItemsUpForTrade"] = 4] = "ItemsUpForTrade";
  CustomizationType2[CustomizationType2["BadgeCollector"] = 5] = "BadgeCollector";
  CustomizationType2[CustomizationType2["FavoriteGame"] = 6] = "FavoriteGame";
  CustomizationType2[CustomizationType2["ScreenshotShowcase"] = 7] = "ScreenshotShowcase";
  CustomizationType2[CustomizationType2["CustomInfoBox"] = 8] = "CustomInfoBox";
  CustomizationType2[CustomizationType2["FavoriteGroup"] = 9] = "FavoriteGroup";
  CustomizationType2[CustomizationType2["ReviewShowcase"] = 10] = "ReviewShowcase";
  CustomizationType2[CustomizationType2["WorkshopShowcase"] = 11] = "WorkshopShowcase";
  CustomizationType2[CustomizationType2["MyWorkshopShowcase"] = 12] = "MyWorkshopShowcase";
  CustomizationType2[CustomizationType2["ArtworkShowcase"] = 13] = "ArtworkShowcase";
  CustomizationType2[CustomizationType2["VideoShowcase"] = 14] = "VideoShowcase";
  CustomizationType2[CustomizationType2["FavoriteGuide"] = 15] = "FavoriteGuide";
  CustomizationType2[CustomizationType2["MyGuides"] = 16] = "MyGuides";
  CustomizationType2[CustomizationType2["AchievementShowcase"] = 17] = "AchievementShowcase";
  CustomizationType2[CustomizationType2["SalienStats"] = 20] = "SalienStats";
  CustomizationType2[CustomizationType2["AwardsShowcase"] = 21] = "AwardsShowcase";
  CustomizationType2[CustomizationType2["FeaturedArtworkShowcase"] = 22] = "FeaturedArtworkShowcase";
  CustomizationType2[CustomizationType2["CompletionistShowcase"] = 23] = "CompletionistShowcase";
  CustomizationType2[CustomizationType2["SteamYearInReview"] = 24] = "SteamYearInReview";
  return CustomizationType2;
})(CustomizationType || {});

// src/index.ts
var SteamWebAPI = class _SteamWebAPI {
  constructor(optionsOrToken) {
    this.API_BASE = "http://api.steampowered.com";
    if (typeof optionsOrToken === "object") {
      const { apiBase, token, fetchOptions = {} } = optionsOrToken;
      if (apiBase !== void 0)
        this.API_BASE = apiBase;
      if (token !== void 0)
        this.token = token;
      this.fetchOptions = fetchOptions;
      return;
    }
    if (typeof optionsOrToken === "string")
      this.token = optionsOrToken;
    this.fetchOptions = {};
  }
  async get({ interfaceName, method, version, options }) {
    const o = {};
    for (const key in options) {
      const value = options[key];
      if (value === void 0)
        continue;
      o[key] = value.toString();
    }
    const params = new URLSearchParams(o);
    const res = await fetch(`${this.API_BASE}/${interfaceName}/${method}/v${version}?${params}`, this.fetchOptions);
    return res;
  }
  async getGlobalAchievementPercentagesForApp({ gameid }) {
    const res = await this.get({
      interfaceName: "ISteamUserStats",
      method: "GetGlobalAchievementPercentagesForApp",
      version: 2,
      options: {
        gameid
      }
    });
    if (!res.ok)
      throw _SteamWebAPI.parseError(await res.text());
    const json = await res.json();
    return json;
  }
  async getPlayerSummaries({ steamids }) {
    const key = this.token;
    if (key === void 0)
      throw Error("GetPlayerSummaries requires a token!");
    if (typeof steamids !== "string")
      steamids = steamids.join(",");
    const res = await this.get({
      interfaceName: "ISteamUser",
      method: "GetPlayerSummaries",
      version: 2,
      options: {
        key,
        steamids
      }
    });
    if (!res.ok)
      throw _SteamWebAPI.parseError(await res.text());
    const json = await res.json();
    return json;
  }
  async getFriendsList({ steamid, relationship }) {
    const key = this.token;
    if (key === void 0)
      throw Error("GetFriendList requires a token!");
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
    if (!res.ok)
      throw _SteamWebAPI.parseError(await res.text());
    const json = await res.json();
    return json;
  }
  async getPlayerAchievements({ steamid, appid, l }) {
    const key = this.token;
    if (key === void 0)
      throw Error("GetPlayerAchievements requires a token!");
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
    if (!res.ok)
      throw _SteamWebAPI.parseError(await res.text());
    const json = await res.json();
    return json;
  }
  async getUserStatsForGame({ steamid, appid }) {
    const key = this.token;
    if (key === void 0)
      throw Error("Token required!");
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
    if (!res.ok)
      throw _SteamWebAPI.parseError(await res.text());
    const json = await res.json();
    return json;
  }
  async getOwnedGames({ steamid, include_appinfo, include_played_free_games, include_extended_appinfo }) {
    const key = this.token;
    if (key === void 0)
      throw Error("GetOwnedGames requires a token!");
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
    if (!res.ok)
      throw _SteamWebAPI.parseError(await res.text());
    const json = await res.json();
    return json;
  }
  async getRecentlyPlayedGames({ steamid, count }) {
    const key = this.token;
    if (key === void 0)
      throw Error("GetRecentlyPlayedGames requires a token!");
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
    if (!res.ok)
      throw _SteamWebAPI.parseError(await res.text());
    const json = await res.json();
    return json;
  }
  async getProfileCustomization({ steamid, include_inactive_customizations, include_purchased_customizations }) {
    const key = this.token;
    if (key === void 0)
      throw Error("GetRecentlyPlayedGames requires a token!");
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
    if (!res.ok)
      throw _SteamWebAPI.parseError(await res.text());
    const json = await res.json();
    return json;
  }
  static parseError(body) {
    var _a, _b;
    const document = new JSDOM(body).window.document;
    const name = (_b = (_a = document.querySelector("h1")) == null ? void 0 : _a.textContent) != null ? _b : null;
    const message = Array.from(document.body.childNodes).slice(1).reduce((p, c) => p + c.textContent, "");
    const error = new Error(message);
    if (name !== null)
      error.name = name;
    return error;
  }
};
export {
  BanContentCheckResult,
  CustomizationType,
  SteamWebAPI as default
};
//# sourceMappingURL=index.js.map