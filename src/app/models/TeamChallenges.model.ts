export class Instruction {
    order: number;
    text: string;
    presentationId?: any;
    challengeId: number;
}

export class TeamChallenge {
    id: number;
    userId: number;
    userFullName: string;
    modifiedDate: Date;
    name: string;
    instructions: Instruction[];
    numberInvited: number;
    numberOfEntries: number;
    numberToReview: number;
    numberReviewed: number;
    enableMultipleRatingCategories: boolean;
    folderId: number;
    includeInLeaderboard: boolean;
    displayScoresInLeaderboard: boolean;
    peersMaySubmitFeedback: boolean;
    averageScore: number;
    reviewerCount: number;
    isUserChallengeReviewer: boolean;
    courseId?: any;
    receiveSubmissionEmail: boolean;
    createdDate: Date;
    enableAutomaticReviewerReminders: boolean;
    daysUntilSendReviewerReminder: number;
    allowManagersToReview: boolean;
    manualReviewersEnabled: boolean;
    scoreCriteriaEnabled: boolean;
    machineScoringEnabledForChallenge: boolean;
    displayMachineScoreToParticipants: boolean;
}
