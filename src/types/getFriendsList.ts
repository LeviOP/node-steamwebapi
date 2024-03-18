export interface FriendsList {
    friends: Friend[];
}

export interface Friend {
    steamid: string;
    relationship: string;
    friend_since: number;
}
