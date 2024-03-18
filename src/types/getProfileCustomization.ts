export enum BanContentCheckResult {
    NotScanned = 0,
    Reset = 1,
    NeedsChecking = 2,
    VeryUnlikely = 5,
    Unlikely = 30,
    Possible = 50,
    Likely = 75,
    VeryLikely = 100
}

export enum CustomizationType {
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

export interface TypeSlotMap {
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

export type ActiveCustomization =
    | Values<{ [K in keyof TypeSlotMap]: ActiveCustomizationKnown<K> }>
    | ActiveCustomizationUnknown;

export interface CustomizationSlot {
    slot: number;
}

export interface GameCollectorSlot extends CustomizationSlot {
    appid: number;
}

export interface ItemShowcaseSlot extends CustomizationSlot {
    appid: number;
    item_assetid: string;
    item_contextid: string;
    item_classid: string;
    item_instanceid: string;
}

export interface ItemsUpForTradeSlot extends CustomizationSlot {
    appid: number;
    item_assetid: string;
    item_contextid: string;
    item_classid: string;
    item_instanceid: string;
}

export interface BadgeCollectorSlot extends CustomizationSlot {
    appid?: number;
    badgeid?: number;
}

export interface FavoriteGameSlot extends CustomizationSlot {
    appid: number;
}

export interface ScreenshotShowcaseSlot extends CustomizationSlot {
    publishedfileid?: string;
}

export interface CustomInfoBoxSlot extends CustomizationSlot {
    notes: string;
    title: string;
    ban_check_result: BanContentCheckResult;
}

export interface FavoriteGroupSlot extends CustomizationSlot {
    accountid: number;
}

export interface ReviewShowcaseSlot extends CustomizationSlot {
    appid: number;
}

export interface WorkshopShowcaseSlot extends CustomizationSlot {
    appid: number;
    publishedfileid: string;
}

export interface MyWorkshopShowcaseSlot extends CustomizationSlot {
    appid: number;
    publishedfileid: string;
}

export interface ArtworkShowcaseSlot extends CustomizationSlot {
    publishedfileid?: string;
}

export interface VideoShowcaseSlot extends CustomizationSlot {
    publishedfileid?: string;
}

export interface FavoriteGuideSlot extends CustomizationSlot {
    appid: number;
    publishedfileid: string;
}

export interface MyGuidesSlot extends CustomizationSlot {
    appid: number;
    publishedfileid: string;
}

export interface AchievementShowcaseSlot extends CustomizationSlot {
    appid: number;
    title: string;
}

export interface FeaturedArtworkShowcaseSlot extends CustomizationSlot {
    publishedfileid: string;
}

export interface CompletionistShowcaseSlot extends CustomizationSlot {
    appid: number;
}

export interface SteamYearInReviewSlot extends CustomizationSlot {
    replay_year: number;
}

export interface ProfileCustomizations<C extends Customization> {
    customizations?: C[];
    slots_available: number;
    profile_theme: ProfileTheme;
    profile_preferences: ProfilePreferences;
}

export interface Customization {
    customization_type: number;
    active: boolean;
    level: number;
}

export interface ActiveCustomizationBase extends Customization {
    active: true;
    large: boolean;
    customization_style: number;
    purchaseid: string;
}

export interface InactiveCustomization extends Customization {
    active: false;
}

export interface ActiveCustomizationKnown<C extends keyof TypeSlotMap> extends ActiveCustomizationBase {
    customization_type: C;
    slots: TypeSlotMap[C];
}

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export interface ActiveCustomizationUnknown extends ActiveCustomizationBase {
    customization_type: Exclude<IntRange<0, 30>, keyof TypeSlotMap>;
    slots?: CustomizationSlotUnknown[];
}

export interface CustomizationSlotUnknown extends CustomizationSlot {
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

export interface ProfileCustomizationsPurchased {
    purchased_customizations?: PurchasedCustomization[];
}

export interface PurchasedCustomization {
    purchaseid: string;
    customization_type: CustomizationType | number;
    level: number;
}

export interface ProfileTheme {
    theme_id: string;
    title: string;
}

export interface ProfilePreferences {
    hide_profile_awards: boolean;
}

