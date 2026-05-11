import Map "mo:core/Map";
import List "mo:core/List";
import CommonTypes "../types/common";
import WorkshopTypes "../types/workshops";

module {
  public type State = {
    workshops     : Map.Map<WorkshopTypes.WorkshopId, WorkshopTypes.Workshop>;
    registrations : Map.Map<WorkshopTypes.WorkshopId, List.List<WorkshopTypes.Registration>>;
    counter       : { var nextId : Nat };
  };

  // Seed timestamps: fixed future dates (nanoseconds from Unix epoch).
  // 2026-06-16 = REF + 15 days, etc.
  // Precomputed: REF=1_748_736_000_000_000_000, DAY=86_400_000_000_000
  let seedData : [WorkshopTypes.Workshop] = [
    {
      id              = 1;
      title           = "Raising Emotionally Intelligent Children";
      description     = "A hands-on workshop for parents on building emotional vocabulary and regulation skills in children aged 5-12. Includes role-play exercises and take-home toolkits.";
      facilitator     = "Dr. Priya Sharma (Child Psychologist)";
      dateTime        = 1_750_032_000_000_000_000; // 2026-06-16
      maxCapacity     = 40;
      registeredCount = 0;
    },
    {
      id              = 2;
      title           = "Teen Minds: Understanding Adolescent Behavior";
      description     = "Decode the teenage brain. This workshop covers neuroscience of adolescence, risk-taking behavior, and how parents can stay connected during the turbulent teen years.";
      facilitator     = "Ms. Ananya Bose (Adolescent Therapist)";
      dateTime        = 1_750_636_800_000_000_000; // 2026-06-23
      maxCapacity     = 50;
      registeredCount = 0;
    },
    {
      id              = 3;
      title           = "Conflict-Free Communication at Home";
      description     = "Practical communication strategies to resolve family tension without shouting or punishment. Based on Non-Violent Communication (NVC) principles adapted for families.";
      facilitator     = "Mr. Rajan Mehta (Family Counselor)";
      dateTime        = 1_751_328_000_000_000_000; // 2026-07-01
      maxCapacity     = 35;
      registeredCount = 0;
    },
    {
      id              = 4;
      title           = "Screen Time & Digital Wellness for Families";
      description     = "Navigate the digital age together. This workshop provides evidence-based guidelines for screen time, online safety, and building healthy tech habits as a family.";
      facilitator     = "Dr. Kavita Nair (Digital Wellness Expert)";
      dateTime        = 1_752_019_200_000_000_000; // 2026-07-09
      maxCapacity     = 60;
      registeredCount = 0;
    },
    {
      id              = 5;
      title           = "Supporting Children Through Academic Anxiety";
      description     = "Help your child manage exam stress, build a healthy relationship with learning, and develop resilience strategies that last a lifetime.";
      facilitator     = "Ms. Deepa Iyer (Educational Psychologist)";
      dateTime        = 1_752_624_000_000_000_000; // 2026-07-16
      maxCapacity     = 45;
      registeredCount = 0;
    }
  ];

  public func seedWorkshops(state : State) : () {
    if (not state.workshops.isEmpty()) { return };
    for (w in seedData.values()) {
      state.workshops.add(w.id, w);
    };
    state.counter.nextId := seedData.size() + 1;
  };

  public func listWorkshops(state : State) : [WorkshopTypes.Workshop] {
    state.workshops.values().toArray();
  };

  public func getWorkshop(state : State, id : WorkshopTypes.WorkshopId) : ?WorkshopTypes.Workshop {
    state.workshops.get(id);
  };

  public func register(
    state      : State,
    workshopId : WorkshopTypes.WorkshopId,
    userId     : CommonTypes.UserId
  ) : Bool {
    let ws = switch (state.workshops.get(workshopId)) {
      case null   { return false };
      case (?w) { w };
    };
    if (ws.registeredCount >= ws.maxCapacity) { return false };
    let regs = switch (state.registrations.get(workshopId)) {
      case (?lst) { lst };
      case null   {
        let lst = List.empty<WorkshopTypes.Registration>();
        state.registrations.add(workshopId, lst);
        lst;
      };
    };
    let alreadyRegistered = regs.find(func(r : WorkshopTypes.Registration) : Bool {
      r.userId == userId
    });
    if (alreadyRegistered != null) { return false };
    regs.add({
      workshopId   = workshopId;
      userId       = userId;
      registeredAt = CommonTypes.now();
    });
    let updated : WorkshopTypes.Workshop = { ws with registeredCount = ws.registeredCount + 1 };
    state.workshops.add(workshopId, updated);
    true;
  };

  public func getUserRegistrations(
    state  : State,
    userId : CommonTypes.UserId
  ) : [WorkshopTypes.Workshop] {
    let results = List.empty<WorkshopTypes.Workshop>();
    for ((wsId, regs) in state.registrations.entries()) {
      let found = regs.find(func(r : WorkshopTypes.Registration) : Bool { r.userId == userId });
      if (found != null) {
        switch (state.workshops.get(wsId)) {
          case (?ws) { results.add(ws) };
          case null  {};
        };
      };
    };
    results.toArray();
  };

  public func isRegistered(
    state      : State,
    workshopId : WorkshopTypes.WorkshopId,
    userId     : CommonTypes.UserId
  ) : Bool {
    switch (state.registrations.get(workshopId)) {
      case null    { false };
      case (?regs) {
        regs.find(func(r : WorkshopTypes.Registration) : Bool { r.userId == userId }) != null;
      };
    };
  };
};
