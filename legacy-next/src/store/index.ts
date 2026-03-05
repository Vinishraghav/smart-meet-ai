import { create } from 'zustand';

export interface Participant {
    id: string;
    meetingId: string;
    name: string;
    email: string;
    joinedAt: string;
    micOn: boolean;
    cameraOn: boolean;
    isHost: boolean;
}

export interface Meeting {
    id: string;
    meetingId: string; // The short readable ID like ax82kP9
    title: string;
    hostId: string;
    date: string;
    duration: number;
    status: 'upcoming' | 'completed' | 'ongoing';
    participants: Participant[];
    type?: 'general' | 'interview';
    productivityScore?: number;
    moodIndex?: number;
    summary?: string;
    scheduledTime?: string;
    recordingEnabled: boolean;
}

export interface ActionItem {
    id: string;
    task: string;
    assignee: string;
    dueDate: string;
    completed: boolean;
}

interface SmartMeetState {
    currentMeeting: string | null;
    meetings: Meeting[];
    actionItems: ActionItem[];
    recordingMode: 'auto' | 'manual';
    isFirstTimeUser: boolean;
    canParticipantsRecord: boolean;
    currentUser: { name: string, email: string } | null;
    startMeeting: (title?: string, type?: 'general' | 'interview', idOverride?: string) => string;
    joinMeeting: (meetingId: string, participant: Participant) => void;
    endMeeting: (id: string, duration: number, productivity?: number, mood?: number) => void;
    toggleActionItem: (id: string) => void;
    addMeeting: (meeting: Meeting) => void;
    addParticipant: (meetingId: string, participant: Participant) => void;
    removeParticipant: (meetingId: string, participantId: string) => void;
    setRecordingMode: (mode: 'auto' | 'manual') => void;
    setRecordingPermission: (allowed: boolean) => void;
    setCurrentUser: (user: { name: string, email: string }) => void;
    completeOnboarding: () => void;
}

export const useStore = create<SmartMeetState>((set) => ({
    currentMeeting: null,
    meetings: [],
    actionItems: [],
    recordingMode: 'auto',
    isFirstTimeUser: true,
    canParticipantsRecord: true,
    currentUser: null,
    startMeeting: (title = 'Ad-hoc Meeting', type = 'general', idOverride) => {
        const id = `m${Date.now()}`;
        const meetingId = idOverride || Math.random().toString(36).substring(2, 9);
        const hostEmail = 'host@smartmeet.ai';
        const hostParticipant: Participant = {
            id: 'host-1',
            meetingId: id,
            name: 'You',
            email: hostEmail,
            joinedAt: new Date().toISOString(),
            micOn: true,
            cameraOn: true,
            isHost: true
        };
        const newMeeting: Meeting = {
            id,
            meetingId,
            title,
            hostId: 'host-1',
            date: new Date().toISOString(),
            duration: 0,
            status: 'ongoing',
            participants: [hostParticipant],
            type,
            recordingEnabled: true,
        };
        set((state) => ({
            currentMeeting: id,
            meetings: [newMeeting, ...state.meetings],
            isFirstTimeUser: false,
        }));

        console.log("POST /webhook/meeting-created", {
            meetingId,
            meetingLink: `[Base URL]/meet/${meetingId}`,
            host: hostEmail,
            participants: []
        });

        return meetingId;
    },
    joinMeeting: (mId, participant) => {
        set((state) => ({
            meetings: state.meetings.map(m =>
                m.meetingId === mId ? { ...m, participants: [...m.participants, participant] } : m
            )
        }));
    },
    endMeeting: (id, duration, productivity = 85, mood = 70) => {
        set((state) => ({
            currentMeeting: null,
            meetings: state.meetings.map((m) =>
                m.id === id ? { ...m, status: 'completed', duration, productivityScore: productivity, moodIndex: mood } : m
            ),
        }));
    },
    toggleActionItem: (id) => {
        set((state) => ({
            actionItems: state.actionItems.map((a) =>
                a.id === id ? { ...a, completed: !a.completed } : a
            ),
        }));
    },
    addMeeting: (meeting) => set((state) => ({ meetings: [...state.meetings, meeting], isFirstTimeUser: false })),
    addParticipant: (mId, participant) => set((state) => ({
        meetings: state.meetings.map(m => m.id === mId ? { ...m, participants: [...m.participants, participant] } : m)
    })),
    removeParticipant: (mId, pId) => set((state) => ({
        meetings: state.meetings.map(m => m.id === mId ? { ...m, participants: m.participants.filter(p => p.id !== pId) } : m)
    })),
    setRecordingMode: (mode) => set({ recordingMode: mode }),
    setRecordingPermission: (allowed) => set({ canParticipantsRecord: allowed }),
    setCurrentUser: (user) => set({ currentUser: user }),
    completeOnboarding: () => set({ isFirstTimeUser: false }),
}));
