export interface EventRegisterData {
    name: string,
    description: string,
    duration: string,
    location: string,
    categorization: string,
    organizer: string,
    maxParticipants: number
}

export interface EventRegisterDateData {
    date: string,
    hour: string,
    currentParticipants: number
}
