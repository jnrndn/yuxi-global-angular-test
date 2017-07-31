export class ChallengeInstruction {
    order: number;
    text: string;
    presentationId?: any;
    challengeId: number;
}

export class MyChallenge {
    id: number;
    challengeId: number;
    courseId?: any;
    challengeName: string;
    challengeInstructions: ChallengeInstruction[];
    challengeModifiedDate: Date;
    challengeEnableMultipleRatingCategories: boolean;
    challengeIncludeInLeaderboard: boolean;
    challengeDisplayScoresInLeaderboard: boolean;
    challengerUserId: number;
    challengerFirstName: string;
    challengerLastName: string;
    recipientUserId: number;
    recipientFirstName: string;
    recipientLastName: string;
    recipientManagerId: number;
    state: number;
    numberOfVersions: number;
    rating: number;
    overallScore: number;
    modifiedDate: Date;
    completedDate?: any;
    streamHost: string;
    streamMaximumLength: number;
    submissionsPid: number;
    autoLoginTokenId: string;
    challengeUserId: number;
}