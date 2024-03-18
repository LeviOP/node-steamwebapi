export interface UserStats {
    steamID: string;
    gameName: string;
    achievements: UserStatsAchievement[];
}

export interface UserStatsAchievement {
    name: string;
    achieved: number;
}
