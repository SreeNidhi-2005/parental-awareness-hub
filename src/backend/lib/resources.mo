import Map "mo:core/Map";
import List "mo:core/List";
import CommonTypes "../types/common";
import ResourceTypes "../types/resources";

module {
  public type State = {
    resources : Map.Map<ResourceTypes.ResourceId, ResourceTypes.Resource>;
    bookmarks : Map.Map<CommonTypes.UserId, List.List<ResourceTypes.BookmarkedResource>>;
    counter   : { var nextId : Nat };
  };

  let seedData : [ResourceTypes.Resource] = [
    {
      id          = 1;
      title       = "10 Ways to Listen Actively to Your Child";
      description = "A practical guide to active listening techniques that help children feel heard and understood, reducing behavioral outbursts and building trust.";
      category    = #parentingTips;
      link        = "https://parentalawarenesshub.com/resources/active-listening";
    },
    {
      id          = 2;
      title       = "Setting Boundaries Without Punishment";
      description = "Evidence-based approaches to boundary-setting that teach self-regulation rather than fear-based compliance.";
      category    = #parentingTips;
      link        = "https://parentalawarenesshub.com/resources/positive-boundaries";
    },
    {
      id          = 3;
      title       = "The Power of Play: Why Unstructured Time Matters";
      description = "Research-backed reasons why free play is essential for cognitive, emotional, and social development at every age.";
      category    = #parentingTips;
      link        = "https://parentalawarenesshub.com/resources/power-of-play";
    },
    {
      id          = 4;
      title       = "Understanding Childhood Anxiety: A Parent's Guide";
      description = "Comprehensive overview of childhood anxiety disorders, common triggers, and how parents can create a supportive environment at home.";
      category    = #wellnessArticles;
      link        = "https://parentalawarenesshub.com/resources/childhood-anxiety";
    },
    {
      id          = 5;
      title       = "Teen Depression: What Every Parent Should Know";
      description = "Warning signs of depression in teenagers, the importance of early intervention, and how to start the conversation with your child.";
      category    = #wellnessArticles;
      link        = "https://parentalawarenesshub.com/resources/teen-depression";
    },
    {
      id          = 6;
      title       = "Building Emotional Resilience in Children";
      description = "How parents can foster resilience by validating emotions, teaching coping strategies, and modeling healthy stress responses.";
      category    = #wellnessArticles;
      link        = "https://parentalawarenesshub.com/resources/emotional-resilience";
    },
    {
      id          = 7;
      title       = "The Science of Mindfulness for Families";
      description = "Simple mindfulness practices proven to reduce family stress and improve parent-child connection, adapted for busy modern families.";
      category    = #wellnessArticles;
      link        = "https://parentalawarenesshub.com/resources/family-mindfulness";
    },
    {
      id          = 8;
      title       = "Dr. Shefali Tsabary on Conscious Parenting";
      description = "Key principles from the best-selling author on how parental self-awareness transforms family relationships.";
      category    = #expertGuidance;
      link        = "https://parentalawarenesshub.com/resources/conscious-parenting";
    },
    {
      id          = 9;
      title       = "Non-Violent Communication (NVC) for Parents";
      description = "How Marshall Rosenberg's NVC framework can revolutionize communication at home, replacing blame with empathy and connection.";
      category    = #expertGuidance;
      link        = "https://parentalawarenesshub.com/resources/nvc-parents";
    },
    {
      id          = 10;
      title       = "When to Seek Professional Help for Your Child";
      description = "A clear guide to recognizing when a child's emotional or behavioral difficulties warrant professional assessment and intervention.";
      category    = #expertGuidance;
      link        = "https://parentalawarenesshub.com/resources/seek-professional-help";
    },
    {
      id          = 11;
      title       = "Child Mental Health Crisis Lines";
      description = "Immediate support resources including iCall, Vandrevala Foundation Helpline, and NIMHANS helplines available 24/7 for children and families in distress.";
      category    = #emergencySupport;
      link        = "https://parentalawarenesshub.com/resources/crisis-helplines";
    },
    {
      id          = 12;
      title       = "What to Do If Your Child Expresses Suicidal Thoughts";
      description = "Step-by-step guidance for parents on how to respond calmly, what to say, what to avoid, and when to seek immediate help.";
      category    = #emergencySupport;
      link        = "https://parentalawarenesshub.com/resources/suicide-prevention";
    }
  ];

  public func seedResources(state : State) : () {
    if (not state.resources.isEmpty()) { return };
    for (r in seedData.values()) {
      state.resources.add(r.id, r);
    };
    state.counter.nextId := seedData.size() + 1;
  };

  public func listResources(state : State) : [ResourceTypes.Resource] {
    state.resources.values().toArray();
  };

  public func listByCategory(
    state    : State,
    category : ResourceTypes.ResourceCategory
  ) : [ResourceTypes.Resource] {
    let eq = func(a : ResourceTypes.ResourceCategory, b : ResourceTypes.ResourceCategory) : Bool {
      switch (a, b) {
        case (#parentingTips,    #parentingTips)    { true };
        case (#wellnessArticles, #wellnessArticles) { true };
        case (#expertGuidance,   #expertGuidance)   { true };
        case (#emergencySupport, #emergencySupport) { true };
        case (_, _)                                  { false };
      };
    };
    state.resources.values().filter(func(r : ResourceTypes.Resource) : Bool {
      eq(r.category, category)
    }).toArray();
  };

  public func saveBookmark(
    state      : State,
    userId     : CommonTypes.UserId,
    resourceId : ResourceTypes.ResourceId
  ) : () {
    switch (state.resources.get(resourceId)) {
      case null { return };
      case _    {};
    };
    let lst = switch (state.bookmarks.get(userId)) {
      case (?l) { l };
      case null  {
        let l = List.empty<ResourceTypes.BookmarkedResource>();
        state.bookmarks.add(userId, l);
        l;
      };
    };
    let alreadySaved = lst.find(func(b : ResourceTypes.BookmarkedResource) : Bool {
      b.resourceId == resourceId
    });
    if (alreadySaved == null) {
      lst.add({
        userId     = userId;
        resourceId = resourceId;
        savedAt    = CommonTypes.now();
      });
    };
  };

  public func removeBookmark(
    state      : State,
    userId     : CommonTypes.UserId,
    resourceId : ResourceTypes.ResourceId
  ) : () {
    switch (state.bookmarks.get(userId)) {
      case null    {};
      case (?lst) {
        let filtered = lst.filter(func(b : ResourceTypes.BookmarkedResource) : Bool {
          b.resourceId != resourceId
        });
        lst.clear();
        lst.append(filtered);
      };
    };
  };

  public func listBookmarks(
    state  : State,
    userId : CommonTypes.UserId
  ) : [ResourceTypes.Resource] {
    switch (state.bookmarks.get(userId)) {
      case null    { [] };
      case (?lst) {
        let results = List.empty<ResourceTypes.Resource>();
        for (b in lst.values()) {
          switch (state.resources.get(b.resourceId)) {
            case (?r) { results.add(r) };
            case null {};
          };
        };
        results.toArray();
      };
    };
  };
};
