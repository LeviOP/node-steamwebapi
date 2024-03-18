export interface PlayerSummaries {
    players: PlayerSummary[];
}

export interface PlayerSummary {
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
