import type { backendInterface, LearningModule, Workshop, Resource, Feedback, Testimonial, UserProfile, ModuleProgress, ChatResponse } from "../backend";
import { ResourceCategory, ProgressStatus, ChatRole } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleModules: LearningModule[] = [
  {
    id: BigInt(1),
    title: "Understanding Today's Generation",
    icon: "🧠",
    tips: ["Listen actively without interrupting", "Try to understand their digital world", "Avoid comparing with your own childhood"],
    description: "Explore the values, habits, and world view of today's children and teenagers.",
    article: "Today's generation has grown up with smartphones, social media, and constant connectivity. Understanding their unique challenges is the first step toward better communication.",
    category: "Generation Gap",
  },
  {
    id: BigInt(2),
    title: "Signs of Stress & Depression in Children",
    icon: "💙",
    tips: ["Watch for withdrawal from friends", "Notice changes in sleep or appetite", "Take emotional outbursts seriously"],
    description: "Learn to identify early warning signs of emotional distress in your child.",
    article: "Children often cannot articulate their feelings. Parents who learn to observe behavioral changes early can provide timely support and prevent escalation.",
    category: "Mental Health",
  },
  {
    id: BigInt(3),
    title: "Healthy Parenting Communication",
    icon: "💬",
    tips: ["Use 'I feel' statements", "Schedule regular family check-ins", "Validate emotions before offering advice"],
    description: "Practical methods to communicate with your child in a healthy, supportive way.",
    article: "Healthy communication starts with empathy. When children feel heard and respected, they are more likely to open up about their struggles.",
    category: "Communication",
  },
];

const sampleWorkshops: Workshop[] = [
  {
    id: BigInt(1),
    title: "Mindful Parenting Workshop",
    description: "A guided session on practising mindfulness as a parent to reduce reactive behaviour.",
    facilitator: "Dr. Priya Sharma",
    dateTime: now + BigInt(7 * 24 * 60 * 60 * 1_000_000_000),
    registeredCount: BigInt(23),
    maxCapacity: BigInt(50),
  },
  {
    id: BigInt(2),
    title: "Teen Mental Health Awareness",
    description: "Understanding the mental health landscape of teenagers and how to support them.",
    facilitator: "Mr. Arjun Mehta",
    dateTime: now + BigInt(14 * 24 * 60 * 60 * 1_000_000_000),
    registeredCount: BigInt(15),
    maxCapacity: BigInt(40),
  },
];

const sampleResources: Resource[] = [
  {
    id: BigInt(1),
    title: "10 Ways to Connect with Your Teenager",
    description: "Practical tips to bridge the gap and build trust with your teen.",
    link: "https://example.com/connect-teens",
    category: ResourceCategory.parentingTips,
  },
  {
    id: BigInt(2),
    title: "Recognising Anxiety in Children",
    description: "A guide for parents to identify and respond to childhood anxiety.",
    link: "https://example.com/childhood-anxiety",
    category: ResourceCategory.wellnessArticles,
  },
  {
    id: BigInt(3),
    title: "Child Mental Health Helpline",
    description: "24/7 support line for parents concerned about their child's mental health.",
    link: "https://example.com/helpline",
    category: ResourceCategory.emergencySupport,
  },
];

const sampleTestimonials: Testimonial[] = [
  {
    id: BigInt(1),
    parentName: "Sunita Kapoor",
    content: "This platform helped me understand why my teenager was becoming distant. I now feel more equipped to support him.",
    submittedAt: now - BigInt(3 * 24 * 60 * 60 * 1_000_000_000),
  },
  {
    id: BigInt(2),
    parentName: "Rajesh Verma",
    content: "The communication modules changed how I talk to my kids. We argue less and laugh more now.",
    submittedAt: now - BigInt(7 * 24 * 60 * 60 * 1_000_000_000),
  },
];

const sampleProfile: UserProfile = {
  id: { _isPrincipal: true, toString: () => "aaaaa-aa" } as any,
  name: "Demo Parent",
  bio: "Parent of two wonderful kids",
  joinedAt: now - BigInt(30 * 24 * 60 * 60 * 1_000_000_000),
  childrenAges: [BigInt(10), BigInt(15)],
};

export const mockBackend: backendInterface = {
  chat: async (request): Promise<ChatResponse> => ({
    timestamp: BigInt(Date.now()) * BigInt(1_000_000),
    reply: "That's a great question! Remember that every child is unique. Try to listen without judgment and create a safe space for them to express themselves. Would you like some specific tips?",
  }),

  getDailyTip: async (): Promise<string> =>
    "Take five minutes today to ask your child how they are feeling — and really listen to the answer.",

  getModule: async (id): Promise<LearningModule | null> =>
    sampleModules.find((m) => m.id === id) ?? null,

  getMyBookmarks: async (): Promise<Resource[]> => [sampleResources[0]],

  getMyProfile: async (): Promise<UserProfile | null> => sampleProfile,

  getMyProgress: async (): Promise<ModuleProgress[]> => [
    { moduleId: BigInt(1), status: ProgressStatus.completed, bookmarked: false },
    { moduleId: BigInt(2), status: ProgressStatus.inProgress, bookmarked: true },
  ],

  getMyWorkshops: async (): Promise<Workshop[]> => [sampleWorkshops[0]],

  getWorkshop: async (id): Promise<Workshop | null> =>
    sampleWorkshops.find((w) => w.id === id) ?? null,

  isRegisteredForWorkshop: async (): Promise<boolean> => false,

  listFeedbacks: async (): Promise<Feedback[]> => [],

  listModules: async (): Promise<LearningModule[]> => sampleModules,

  listResources: async (): Promise<Resource[]> => sampleResources,

  listResourcesByCategory: async (category): Promise<Resource[]> =>
    sampleResources.filter((r) => r.category === category),

  listTestimonials: async (): Promise<Testimonial[]> => sampleTestimonials,

  listWorkshops: async (): Promise<Workshop[]> => sampleWorkshops,

  registerForWorkshop: async (): Promise<boolean> => true,

  removeBookmark: async (): Promise<void> => undefined,

  saveBookmark: async (): Promise<void> => undefined,

  submitFeedback: async (parentName, email, rating, message): Promise<Feedback> => ({
    id: BigInt(1),
    parentName,
    email,
    rating,
    message,
    submittedAt: BigInt(Date.now()) * BigInt(1_000_000),
  }),

  submitTestimonial: async (parentName, content): Promise<Testimonial> => ({
    id: BigInt(1),
    parentName,
    content,
    submittedAt: BigInt(Date.now()) * BigInt(1_000_000),
  }),

  updateProgress: async (): Promise<void> => undefined,

  upsertMyProfile: async (name, bio, childrenAges): Promise<UserProfile> => ({
    ...sampleProfile,
    name,
    bio,
    childrenAges,
  }),
};
