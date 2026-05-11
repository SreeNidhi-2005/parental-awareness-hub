import Map "mo:core/Map";
import List "mo:core/List";
import CommonTypes "../types/common";
import ModuleTypes "../types/modules";

module {
  public type State = {
    modules  : Map.Map<ModuleTypes.ModuleId, ModuleTypes.LearningModule>;
    progress : Map.Map<CommonTypes.UserId, List.List<ModuleTypes.ModuleProgress>>;
    counter  : { var nextId : Nat };
  };

  let seedData : [ModuleTypes.LearningModule] = [
    {
      id          = 1;
      title       = "Understanding Today's Generation";
      description = "Explore the values, challenges, and digital world that shapes today's children and teenagers.";
      icon        = "🧬";
      category    = "generational";
      article     = "Today's children - often called Gen Z or Gen Alpha - have grown up surrounded by smartphones, social media, and instant information. Their world moves faster, their pressures are more visible, and their emotional needs are distinct from previous generations. Parents who understand this generational context can build deeper connections and offer more meaningful support.\n\nKey differences include:\n- Digital nativity: children learn, socialize, and express themselves online.\n- Increased mental health awareness but reduced stigma around help-seeking.\n- Greater exposure to global issues causing eco-anxiety and social awareness.\n- Short attention spans shaped by algorithmically curated content.\n\nUnderstanding these traits is the first step to empathetic parenting.";
      tips        = [
        "Ask your child about their favorite online spaces without judgment.",
        "Learn the apps and platforms they use - familiarity builds trust.",
        "Acknowledge that their pressures are real, even if different from yours.",
        "Celebrate their values around social justice and inclusion.",
        "Limit screen-time battles by negotiating together rather than dictating."
      ];
    },
    {
      id          = 2;
      title       = "Signs of Stress & Depression in Children";
      description = "Learn to recognize early warning signs of emotional distress and depression in your child.";
      icon        = "🌧";
      category    = "mentalHealth";
      article     = "Stress and depression in children often present differently than in adults. Children may not have the vocabulary to describe internal struggles, so they express them through behavior changes, physical complaints, or withdrawal.\n\nCommon signs to watch for:\n- Persistent sadness, irritability, or hopelessness lasting more than two weeks.\n- Loss of interest in activities they previously enjoyed.\n- Changes in sleep - sleeping too much or too little.\n- Complaints of headaches or stomachaches with no medical cause.\n- Declining academic performance or school avoidance.\n- Social withdrawal from friends and family.\n- Negative self-talk or expressions of worthlessness.\n\nIf you observe several of these signs, seek professional guidance early. Early intervention dramatically improves outcomes.";
      tips        = [
        "Check in daily with open-ended questions: 'How did today feel?'",
        "Normalize emotions - it's okay to feel sad or overwhelmed.",
        "Never dismiss or minimize their feelings with 'others have it worse'.",
        "Watch for changes from their baseline behavior, not just 'bad days'.",
        "Consult a school counselor or child psychologist if signs persist."
      ];
    },
    {
      id          = 3;
      title       = "Effects of Family Conflicts";
      description = "Understand how family arguments, tension, and parental conflict affect children's emotional development.";
      icon        = "lightning";
      category    = "familyDynamics";
      article     = "Children are highly sensitive to the emotional climate at home. Even when conflict is not directed at them, witnessing parental arguments or ongoing household tension creates lasting psychological impact.\n\nResearch shows that children exposed to frequent family conflict are more likely to:\n- Develop anxiety and emotional regulation difficulties.\n- Show hypervigilance - constantly scanning for signs of danger or tension.\n- Struggle with trust and forming healthy relationships later in life.\n- Internalize blame - believing the conflict is their fault.\n- Experience academic difficulties due to cognitive load from stress.\n\nThis does not mean parents must never disagree. How conflict is handled matters enormously. Resolving disagreements respectfully, apologizing, and reassuring children teaches healthy conflict resolution skills.";
      tips        = [
        "Never argue in front of children if it involves blame or harsh words.",
        "Reassure children that family disagreements are not their fault.",
        "Model healthy repair - let children see you reconcile after conflict.",
        "Create predictable safe spaces where children feel emotionally secure.",
        "Seek family therapy early if recurring conflicts remain unresolved."
      ];
    },
    {
      id          = 4;
      title       = "Healthy Parenting Communication";
      description = "Develop warm, open communication strategies that strengthen your relationship with your child.";
      icon        = "chat";
      category    = "communication";
      article     = "Effective communication is the foundation of a healthy parent-child relationship. Yet many parents unintentionally use communication patterns that shut down connection rather than build it.\n\nPrinciples of healthy parenting communication:\n- Active listening: Give full attention, maintain eye contact, and reflect back what you hear.\n- Validation first: Acknowledge their feelings before offering advice or solutions.\n- Avoid interrogation: Instead of 'Why did you do that?', try 'Help me understand what happened.'\n- Use 'I' statements: 'I feel worried when...' rather than 'You always...'\n- Create conversation rituals: Dinner without phones, bedtime check-ins, weekend walks.\n\nChildren who feel genuinely heard are far more likely to come to parents when they face serious challenges. The conversations you invest in today build the trust that protects them tomorrow.";
      tips        = [
        "Put your phone away during one-on-one time with your child.",
        "Ask 'what was the best and hardest part of your day?' at dinner.",
        "When they share problems, ask 'do you want advice or just to be heard?'",
        "Praise effort and courage to open up, not just achievements.",
        "Apologize genuinely when you make mistakes - it models accountability."
      ];
    },
    {
      id          = 5;
      title       = "Academic Pressure Awareness";
      description = "Recognize the harmful effects of unrealistic academic expectations and how to support healthy achievement.";
      icon        = "book";
      category    = "academicPressure";
      article     = "The pressure to perform academically has intensified for today's children. Competitive school systems, parental expectations, peer comparison on social media, and uncertain futures create a perfect storm of academic stress.\n\nSigns your child may be struggling under academic pressure:\n- Perfectionism: never satisfied with results, even good ones.\n- Test anxiety: physical symptoms before exams (nausea, racing heart).\n- Procrastination caused by fear of failure rather than laziness.\n- Sleep deprivation from staying up late to study.\n- Comparing themselves negatively to classmates.\n\nYour response as a parent is crucial. Children whose parents emphasize learning over grades, and effort over perfection, consistently show better mental health and - paradoxically - better academic outcomes over time.";
      tips        = [
        "Focus praise on effort: 'I'm proud of how hard you worked' not just 'great grade'.",
        "Let them fail sometimes - struggle is essential for growth.",
        "Avoid comparing their results to siblings or classmates.",
        "Ensure they have genuine downtime - play is essential, not a reward.",
        "Talk about your own mistakes and how you recovered from them."
      ];
    },
    {
      id          = 6;
      title       = "Emotional Support for Teenagers";
      description = "Navigate the unique emotional needs of adolescence with empathy, patience, and clear boundaries.";
      icon        = "heart";
      category    = "teenagers";
      article     = "Adolescence is one of the most turbulent developmental periods in human life. The teenage brain is undergoing massive reorganization, with emotional processing centers highly active while impulse control regions are still developing.\n\nWhat teenagers need most from parents:\n- Unconditional positive regard - love that is not contingent on behavior or achievement.\n- Autonomy within safe limits - the ability to make choices and face natural consequences.\n- A parent who is a 'safe harbor' - someone they can return to without judgment after mistakes.\n- Validation of their intense emotional experiences, not minimization.\n- Consistency - predictable parents create secure teenagers.\n\nMany parents make the mistake of pulling away during adolescence, thinking teenagers want independence. In reality, teenagers need connection more than ever - just in a form that respects their growing identity.";
      tips        = [
        "Knock before entering their space - respecting privacy builds trust.",
        "Be available during 'odd hours' - teens often open up late at night.",
        "Pick your battles: focus on safety issues, let go of minor ones.",
        "Keep 'no-judgment zones' - topics they can discuss without lectures.",
        "Tell them you love them regularly, even when it feels awkward."
      ];
    }
  ];

  public func seedModules(state : State) : () {
    if (not state.modules.isEmpty()) { return };
    for (m in seedData.values()) {
      state.modules.add(m.id, m);
    };
    state.counter.nextId := seedData.size() + 1;
  };

  public func listModules(state : State) : [ModuleTypes.LearningModule] {
    state.modules.values().toArray();
  };

  public func getModule(state : State, id : ModuleTypes.ModuleId) : ?ModuleTypes.LearningModule {
    state.modules.get(id);
  };

  public func getProgress(
    state  : State,
    userId : CommonTypes.UserId
  ) : [ModuleTypes.ModuleProgress] {
    switch (state.progress.get(userId)) {
      case null   { [] };
      case (?lst) { lst.toArray() };
    };
  };

  public func updateProgress(
    state    : State,
    userId   : CommonTypes.UserId,
    moduleId : ModuleTypes.ModuleId,
    status   : ModuleTypes.ProgressStatus,
    bookmark : Bool
  ) : () {
    let lst = switch (state.progress.get(userId)) {
      case (?l) { l };
      case null  {
        let l = List.empty<ModuleTypes.ModuleProgress>();
        state.progress.add(userId, l);
        l;
      };
    };
    let existing = lst.findIndex(func(p : ModuleTypes.ModuleProgress) : Bool { p.moduleId == moduleId });
    let entry : ModuleTypes.ModuleProgress = { moduleId; status; bookmarked = bookmark };
    switch (existing) {
      case (?idx) { lst.put(idx, entry) };
      case null   { lst.add(entry) };
    };
  };
};
