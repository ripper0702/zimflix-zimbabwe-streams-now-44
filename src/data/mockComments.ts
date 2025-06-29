// Define the Comment type
interface Comment {
    id: string;
    user: string;
    avatar: string;
    text: string;
    timestamp: Date;
    likes: number;
}

// Mock comments data
const mockComments: Record<string, Comment[]> = {
    "clip1": [
        {
            id: "c1",
            user: "Jane Doe",
            avatar: "https://example.com/avatar1.png",
            text: "This is a fantastic clip!",
            timestamp: new Date("2023-09-01T10:00:00Z"),
            likes: 5,
        },
        {
            id: "c2",
            user: "John Smith",
            avatar: "https://example.com/avatar2.png",
            text: "I learned a lot, thanks for sharing.",
            timestamp: new Date("2023-09-02T12:30:00Z"),
            likes: 3,
        }
    ],
    "clip2": [
        {
            id: "c3",
            user: "Alice Johnson",
            avatar: "https://example.com/avatar3.png",
            text: "Great content!",
            timestamp: new Date("2023-09-03T09:00:00Z"),
            likes: 7,
        }
    ]
};

export default mockComments;
