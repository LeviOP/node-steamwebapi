export interface PlayerAchievementsFail {
    success: false;
    error: string;
}

export interface PlayerAchievements<T extends Achievement> {
    steamID: string;
    gameName: string;
    achievements: T[];
    success: true;
}

export interface Achievement {
    apiname: string;
    achieved: number;
    unlocktime: number;
}

export interface AchievementWithStrings extends Achievement {
    name: string;
    description: string;
}
