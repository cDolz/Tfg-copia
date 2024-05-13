export interface EventRegisterData {
    title: string,
    description: string,
    duration: string,
    location: string,
    categorization: string,
    organizer: string,
    maxParticipants: number,
    dates: EventRegisterDateData[]
}

export interface EventRegisterDateData {
    date: string,
    hour: string
}


