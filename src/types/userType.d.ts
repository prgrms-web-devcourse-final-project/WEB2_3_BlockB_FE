type UserInfo = {
    "createdAt": string,
    "updatedAt": string,
    "id": number,
    "email": string,
    "nickname": string,
    "introduction": string | null,
    "profileUrl": string,
    "winNumber": number | null
    "drawNumber": number | null,
    "defeatNumber": number | null,
    "role": string,
    "socialType": string,
    "socialId": string,
    "fcmtoken": string | null
  }

type MyNews = {
    "newsId": number,
    "title": string,
    "continent": string,
    "createdAt": string,
}

type Follower = {
    "followerId": number,
    "nickname": string,
    "profile": string,
    "introduction": string
}

type Followee = {
    "followeeId": number,
    "nickname": string,
    "profile": string,
    "introduction": string
}

type ArchivedDebateDetails = {
  "debateId": number,
  "category": string,
  "title": string,
  "time": string,
  "member": string,
  "status": string,
  "isParticipant": boolean
}

type ArchivedDebate = {
  "debateId": number,
  "category": string,
  "title":string,
  "time": string,
  "member": string,
  "status": string,
  "isParticipant": boolean
}

type ProfileUpdate = {nickname?: string | null, introduction?: string | null, file?: string | null}